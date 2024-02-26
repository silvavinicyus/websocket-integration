import { inject, injectable } from 'inversify'
import {
  IInputDeleteConnectionDto,
  IOutputDeleteConnectionDto,
} from '@business/dto/connection/deleteConnectionDto'
import { ConnectionsErrors } from '@business/module/errors/connections'
import { IConnectionRepository } from '@business/repositories/connection/iConnectionRepository'
import {
  ILoggerService,
  ILoggerServiceToken,
} from '@business/services/logger/iLogger'
import { IConnectionEntity } from '@domain/entities/connections'
import { ConnectionModel } from '@framework/models/connection'
import { IError } from '@shared/IError'
import { Either, left, right } from '@shared/either'
import { IOutputFindAllConnectionsDto } from '@business/dto/connection/findAllConnectionsDto'
import { ITransaction } from './transaction'

@injectable()
export class ConnectionRepository implements IConnectionRepository {
  constructor(
    @inject(ILoggerServiceToken)
    private loggerService: ILoggerService
  ) {}

  async getAll(): Promise<IOutputFindAllConnectionsDto> {
    try {
      const connectionsModel = await ConnectionModel.findAll()

      const connections = connectionsModel.map(
        (connection) => connection.get({ plain: true }).connectionId
      )

      return right(connections)
    } catch (err) {
      this.loggerService.error(err)
      return left(ConnectionsErrors.loadFailed())
    }
  }

  async create(
    input: IConnectionEntity,
    trx?: ITransaction
  ): Promise<Either<IError, IConnectionEntity>> {
    try {
      const connection = await ConnectionModel.create(input, {
        transaction: trx,
      })

      return right(connection.get({ plain: true }))
    } catch (err) {
      this.loggerService.error(err)
      return left(ConnectionsErrors.creationError())
    }
  }

  async delete(
    input: IInputDeleteConnectionDto,
    trx?: ITransaction
  ): Promise<IOutputDeleteConnectionDto> {
    try {
      await ConnectionModel.destroy({
        where: {
          connectionId: input.connectionId,
        },
        transaction: trx,
      })

      return right(void 0)
    } catch (err) {
      this.loggerService.error(err)
      return left(ConnectionsErrors.deleteFailed())
    }
  }
}

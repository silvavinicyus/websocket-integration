import { IConnectionEntity } from '@domain/entities/connections'
import { ITransaction } from '@business/dto/transaction/create'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'
import {
  IInputDeleteConnectionDto,
  IOutputDeleteConnectionDto,
} from '@business/dto/connection/deleteConnectionDto'
import { IOutputFindAllConnectionsDto } from '@business/dto/connection/findAllConnectionsDto'

export const IConnectionRepositoryToken = Symbol.for(
  'ConnectionRepositorySymbol'
)

export interface IConnectionRepository {
  create(
    input: IConnectionEntity,
    trx?: ITransaction
  ): Promise<Either<IError, IConnectionEntity>>
  delete(
    input: IInputDeleteConnectionDto,
    trx?: ITransaction
  ): Promise<IOutputDeleteConnectionDto>
  getAll(): Promise<IOutputFindAllConnectionsDto>
}

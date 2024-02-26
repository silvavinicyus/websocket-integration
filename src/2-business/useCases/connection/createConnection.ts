import { inject, injectable } from 'inversify'
import {
  IInputCreateConnectionDto,
  IOutputCreateConnectionDto,
} from '@business/dto/connection/createConnectionDto'
import { ITransaction } from '@business/dto/transaction/create'
import {
  IConnectionRepository,
  IConnectionRepositoryToken,
} from '@business/repositories/connection/iConnectionRepository'
import { ConnectionEntity } from '@domain/entities/connections'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class CreateConnectionUseCase
  implements
    IAbstractUseCase<IInputCreateConnectionDto, IOutputCreateConnectionDto>
{
  constructor(
    @inject(IConnectionRepositoryToken)
    private connectionRepository: IConnectionRepository
  ) {}

  async exec(
    props: IInputCreateConnectionDto,
    trx?: ITransaction
  ): Promise<IOutputCreateConnectionDto> {
    const connectionEntity = ConnectionEntity.create(props, new Date())
    const connectionResult = await this.connectionRepository.create(
      {
        ...connectionEntity.value.export(),
      },
      trx
    )
    return connectionResult
  }
}

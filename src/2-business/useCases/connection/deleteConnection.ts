import { inject, injectable } from 'inversify'
import {
  IInputDeleteConnectionDto,
  IOutputDeleteConnectionDto,
} from '@business/dto/connection/deleteConnectionDto'
import { ITransaction } from '@business/dto/transaction/create'
import {
  IConnectionRepository,
  IConnectionRepositoryToken,
} from '@business/repositories/connection/iConnectionRepository'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class DeleteConnectionUseCase
  implements
    IAbstractUseCase<IInputDeleteConnectionDto, IOutputDeleteConnectionDto>
{
  constructor(
    @inject(IConnectionRepositoryToken)
    private connectionRepository: IConnectionRepository
  ) {}

  async exec(
    props: IInputDeleteConnectionDto,
    trx?: ITransaction
  ): Promise<IOutputDeleteConnectionDto> {
    const deletionResult = await this.connectionRepository.delete(props, trx)

    return deletionResult
  }
}

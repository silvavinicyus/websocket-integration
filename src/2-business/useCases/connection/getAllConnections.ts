import { inject, injectable } from 'inversify'
import {
  IInputFindAllConnectionsDto,
  IOutputFindAllConnectionsDto,
} from '@business/dto/connection/findAllConnectionsDto'
import {
  IConnectionRepository,
  IConnectionRepositoryToken,
} from '@business/repositories/connection/iConnectionRepository'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class GetAllConnectionsUseCase
  implements
    IAbstractUseCase<IInputFindAllConnectionsDto, IOutputFindAllConnectionsDto>
{
  constructor(
    @inject(IConnectionRepositoryToken)
    private connectionRepository: IConnectionRepository
  ) {}

  async exec(): Promise<IOutputFindAllConnectionsDto> {
    const connections = await this.connectionRepository.getAll()

    return connections
  }
}

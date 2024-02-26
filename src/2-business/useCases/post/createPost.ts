import { inject, injectable } from 'inversify'
import {
  IInputCreatePostDto,
  IOutputCreatePostDto,
} from '@business/dto/post/createPostDto'
import { PostEntity } from '@domain/entities/post'
import {
  IPostRepository,
  IPostRepositoryToken,
} from '@business/repositories/post/iPostRepository'
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceToken,
} from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { ITransaction } from '@business/dto/transaction/create'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class CreatePostUseCase
  implements IAbstractUseCase<IInputCreatePostDto, IOutputCreatePostDto>
{
  constructor(
    @inject(IPostRepositoryToken)
    private postRepository: IPostRepository,
    @inject(IUniqueIdentifierServiceToken)
    private uniqueIdentifier: IUniqueIdentifierService
  ) {}

  async exec(
    props: IInputCreatePostDto,
    trx?: ITransaction
  ): Promise<IOutputCreatePostDto> {
    const postEntity = PostEntity.create(props, new Date())
    const postResult = await this.postRepository.create(
      {
        ...postEntity.value.export(),
        uuid: this.uniqueIdentifier.create(),
      },
      trx
    )
    return postResult
  }
}

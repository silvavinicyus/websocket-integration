import { inject, injectable } from 'inversify'
import { IPostEntity } from '@domain/entities/post'
import { IPostRepository } from '@business/repositories/post/iPostRepository'
import {
  ILoggerService,
  ILoggerServiceToken,
} from '@business/services/logger/iLogger'
import { Either, left, right } from '@shared/either'
import { IError } from '@shared/IError'
import { Post } from '@framework/models/post'
import { PostErrors } from '@business/module/errors/post'
import { ITransaction } from './transaction'

@injectable()
export class PostRepositorySequelize implements IPostRepository {
  constructor(
    @inject(ILoggerServiceToken)
    private loggerService: ILoggerService
  ) {}

  async create(
    input: IPostEntity,
    trx?: ITransaction
  ): Promise<Either<IError, IPostEntity>> {
    try {
      const post = await Post.create(input, { transaction: trx })

      return right(post.get({ plain: true }))
    } catch (err) {
      this.loggerService.error(err)
      return left(PostErrors.creationError())
    }
  }
}

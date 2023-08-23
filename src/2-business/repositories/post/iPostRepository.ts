import { IPostEntity } from '@domain/entities/post'
import { ITransaction } from '@business/dto/transaction/create'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export const IPostRepositoryToken = Symbol.for('PostRepositorySymbol')

export interface IPostRepository {
  create(
    input: IPostEntity,
    trx?: ITransaction
  ): Promise<Either<IError, IPostEntity>>
}

import { ContainerModule, interfaces } from 'inversify'
import {
  IConnectionRepository,
  IConnectionRepositoryToken,
} from '@business/repositories/connection/iConnectionRepository'
import {
  IPostRepository,
  IPostRepositoryToken,
} from '@business/repositories/post/iPostRepository'
import {
  ITransactionRepository,
  ITransactionRepositoryToken,
} from '@business/repositories/transaction/iTransactionRepository'
import { ConnectionRepository } from '@framework/repositories/sequelize/connection'
import { PostRepositorySequelize } from '@framework/repositories/sequelize/post'
import { TransactionRepositorySequelize } from '@framework/repositories/sequelize/transaction'

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IPostRepository>(IPostRepositoryToken).to(PostRepositorySequelize)

  bind<ITransactionRepository>(ITransactionRepositoryToken).to(
    TransactionRepositorySequelize
  )

  bind<IConnectionRepository>(IConnectionRepositoryToken).to(
    ConnectionRepository
  )
})

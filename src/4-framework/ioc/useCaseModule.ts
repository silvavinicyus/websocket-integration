import { ContainerModule, interfaces } from 'inversify'
import { CreatePostUseCase } from '@business/useCases/post/createPost'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { CreateTransactionUseCase } from '@business/useCases/transaction/CreateTransactionUseCase'
import { CreateConnectionUseCase } from '@business/useCases/connection/createConnection'
import { DeleteConnectionUseCase } from '@business/useCases/connection/deleteConnection'

export const useCaseModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(VerifyProfileUseCase).toSelf()

  bind(CreateTransactionUseCase).toSelf()

  bind(CreatePostUseCase).toSelf()

  bind(CreateConnectionUseCase).toSelf()
  bind(DeleteConnectionUseCase).toSelf()
})

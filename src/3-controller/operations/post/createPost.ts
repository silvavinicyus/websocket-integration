import { inject } from 'inversify'
import ApiGatewayManagementApi from 'aws-sdk/clients/apigatewaymanagementapi'
import { AWSError } from 'aws-sdk'
import { InputCreatePost } from '@controller/serializers/post/createPost'
import { IOutputCreatePostDto } from '@business/dto/post/createPostDto'
import { IAuthorizerInformation } from '@business/dto/role/authorize'
import { CreatePostUseCase } from '@business/useCases/post/createPost'
import { CreateTransactionUseCase } from '@business/useCases/transaction/CreateTransactionUseCase'
import { left } from '@shared/either'
import { GetAllConnectionsUseCase } from '@business/useCases/connection/getAllConnections'
import { ConnectionsErrors } from '@business/module/errors/connections'
import { DeleteConnectionUseCase } from '@business/useCases/connection/deleteConnection'
import { AbstractOperator } from '../abstractOperator'

export class CreatePostOperator extends AbstractOperator<
  InputCreatePost,
  IOutputCreatePostDto
> {
  constructor(
    @inject(CreateTransactionUseCase)
    private createTransaction: CreateTransactionUseCase,
    @inject(CreatePostUseCase)
    private createPost: CreatePostUseCase,
    @inject(GetAllConnectionsUseCase)
    private getAllConnections: GetAllConnectionsUseCase,
    @inject(DeleteConnectionUseCase)
    private deleteConnection: DeleteConnectionUseCase
  ) {
    super()
  }
  async run(
    input: InputCreatePost,
    _authorizer: IAuthorizerInformation
  ): Promise<IOutputCreatePostDto> {
    this.exec(input)
    const transaction = await this.createTransaction.exec()
    if (transaction.isLeft()) {
      return left(transaction.value)
    }
    const postResult = await this.createPost.exec(
      {
        ...input,
      },
      transaction.value.trx
    )
    if (postResult.isLeft()) {
      await transaction.value.rollback()
      return left(postResult.value)
    }

    const connections = await this.getAllConnections.exec()
    if (connections.isLeft()) {
      return left(connections.value)
    }

    const apiGatewayManagementApi = new ApiGatewayManagementApi({
      endpoint: 'http://localhost:3001',
    })

    await Promise.all(
      connections.value.map((item) =>
        apiGatewayManagementApi
          .postToConnection({
            ConnectionId: item,
            Data: JSON.stringify({
              title: input.title,
              content: input.content,
            }),
          })
          .promise()
          .catch(async (e: AWSError) => {
            if (e.statusCode === 410) {
              const connection = await this.deleteConnection.exec({
                connectionId: item,
              })

              if (connection.isLeft()) {
                return left(connection.value)
              }
            }

            return left(ConnectionsErrors.databaseConn())
          })
      )
    )

    await transaction.value.commit()
    return postResult
  }
}

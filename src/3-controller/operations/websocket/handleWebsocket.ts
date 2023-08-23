import { inject, injectable } from 'inversify'
import { CreateConnectionUseCase } from '@business/useCases/connection/createConnection'
import { DeleteConnectionUseCase } from '@business/useCases/connection/deleteConnection'
import {
  IOutputHandleWebsocket,
  InputHandleWebsocket,
} from '@controller/serializers/websocket/handleWebsocket'
import { left, right } from '@shared/either'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class HandleWebsocketOperator extends AbstractOperator<
  InputHandleWebsocket,
  IOutputHandleWebsocket
> {
  constructor(
    @inject(CreateConnectionUseCase)
    private createConnection: CreateConnectionUseCase,
    @inject(DeleteConnectionUseCase)
    private deleteConnection: DeleteConnectionUseCase
  ) {
    super()
  }

  async run(input: InputHandleWebsocket): Promise<IOutputHandleWebsocket> {
    console.log('\n\n\n\nCHEGOU AQUI\n\n\n\n')

    if (input.eventType === 'CONNECT') {
      console.log('\n\n\n\n DENTRO DO CONNECT \n\n\n\n\n')
      const connection = await this.createConnection.exec({
        connectionId: input.connectionId,
      })

      if (connection.isLeft()) {
        return left(connection.value)
      }
    } else if (input.eventType === 'DISCONNECT') {
      const connection = await this.deleteConnection.exec({
        connectionId: input.connectionId,
      })

      if (connection.isLeft()) {
        return left(connection.value)
      }
    }

    return right(void 0)
  }
}

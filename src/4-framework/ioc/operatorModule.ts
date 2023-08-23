import { ContainerModule, interfaces } from 'inversify'
import { CreatePostOperator } from '@controller/operations/post/createPost'
import { HandleWebsocketOperator } from '@controller/operations/websocket/handleWebsocket'

export const operatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreatePostOperator).toSelf()
  bind(HandleWebsocketOperator).toSelf()
})

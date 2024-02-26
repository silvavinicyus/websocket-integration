import '@framework/ioc/inversify.config'
import { HandleWebsocketOperator } from '@controller/operations/websocket/handleWebsocket'
import { InputHandleWebsocket } from '@controller/serializers/websocket/handleWebsocket'
import { middyfy } from '@framework/utility/lambda'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { container } from '@shared/ioc/container'

const handleWebsocket = async (
  event: IHandlerInput
): Promise<IHandlerResult> => {
  try {
    const { connectionId, eventType } = event.requestContext

    const input = new InputHandleWebsocket({ connectionId, eventType })

    const operator = container.get(HandleWebsocketOperator)

    const websocketResult = await operator.run(input)

    if (websocketResult.isLeft()) {
      throw websocketResult.value
    }

    return {
      statusCode: 200,
      body: JSON.stringify('{}'),
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: (err as Error).message }),
    }
  }
}

export const handler = middyfy(handleWebsocket)

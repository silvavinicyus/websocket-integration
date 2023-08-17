import process from 'process'
import { APIGatewayProxyHandler } from 'aws-lambda'
import {
  ApiGatewayManagementApi,
  PostToConnectionCommand,
} from '@aws-sdk/client-apigatewaymanagementapi'

export const main: APIGatewayProxyHandler = async (event) => {
  try {
    const endpoint =
      process.env.IS_OFFLINE === 'true'
        ? 'http://localhost:3001'
        : process.env.WEBSOCKET_ENDPOINT

    const apiGatewayManagementApi = new ApiGatewayManagementApi({ endpoint })
    await Promise.all(
      [{ id: '1' }].map((item) =>
        apiGatewayManagementApi
          .send(
            new PostToConnectionCommand({
              ConnectionId: item.id,
              Data: event.body,
            })
          )
          .catch(() => console.log('error'))
      )
    )

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Done' }),
    }
  } catch (e) {
    console.error(e)

    return {
      statusCode: 500,
      body: JSON.stringify({ message: (e as Error).message }),
    }
  }
}

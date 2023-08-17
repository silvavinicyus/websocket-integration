import { APIGatewayProxyHandler } from 'aws-lambda'

export const main: APIGatewayProxyHandler = async (event) => {
  console.log('aqui')
  try {
    const { eventType, connectionId } = event.requestContext

    if (eventType === 'CONNECT') {
      console.log('This is a CONNECT event type', connectionId)
    } else if (eventType === 'DISCONNECT') {
      console.log('This is a DISCONNECT event type', connectionId)
    }

    return {
      statusCode: 200,
      body: '{}',
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: (err as Error).message }),
    }
  }
}

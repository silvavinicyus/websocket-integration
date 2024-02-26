import { IError } from '@shared/IError'

export class ConnectionsErrors extends IError {
  static creationError(): IError {
    return new ConnectionsErrors({
      statusCode: 500,
      body: {
        code: 'CNT-101',
        message: 'Error on Connection`s creation',
        shortMessage: 'ConnectionCreationFailed',
      },
    })
  }

  static updateError(): IError {
    return new ConnectionsErrors({
      statusCode: 500,
      body: {
        code: 'CNT-102',
        message: 'Error on Connection`s update',
        shortMessage: 'ConnectionUpdateFailed',
      },
    })
  }

  static notFound(): IError {
    return new ConnectionsErrors({
      statusCode: 404,
      body: {
        code: 'CNT-103',
        message: 'Connection not found',
        shortMessage: 'ConnectionNotFound',
      },
    })
  }

  static databaseConn(): IError {
    return new ConnectionsErrors({
      statusCode: 500,
      body: {
        code: 'CNT-104',
        message: 'An internal error in connection with Connection database',
        shortMessage: 'DatabaseConnectionFailed',
      },
    })
  }

  static loadFailed(): IError {
    return new ConnectionsErrors({
      statusCode: 500,
      body: {
        code: 'CNT-105',
        message: 'It wasn`t possible to load',
        shortMessage: 'ConnectionsLoadFailed',
      },
    })
  }

  static deleteFailed(): IError {
    return new ConnectionsErrors({
      statusCode: 500,
      body: {
        code: 'CNT-106',
        message: 'It wasn`t possible to delete this connection',
        shortMessage: 'deleteFailed',
      },
    })
  }
}

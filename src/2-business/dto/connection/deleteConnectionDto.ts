import { IError } from '@shared/IError'
import { Either } from '@shared/either'

export type IInputDeleteConnectionDto = {
  connectionId: string
}

export type IOutputDeleteConnectionDto = Either<IError, void>

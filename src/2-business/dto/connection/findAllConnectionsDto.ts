import { IError } from '@shared/IError'
import { Either } from '@shared/either'

export type IInputFindAllConnectionsDto = null

export type IOutputFindAllConnectionsDto = Either<IError, string[]>

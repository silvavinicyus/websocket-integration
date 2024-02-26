import {
  IConnectionEntity,
  IInputConnectionEntity,
} from '@domain/entities/connections'
import { IError } from '@shared/IError'
import { Either } from '@shared/either'

export type IInputCreateConnectionDto = IInputConnectionEntity
export type IOutputCreateConnectionDto = Either<IError, IConnectionEntity>

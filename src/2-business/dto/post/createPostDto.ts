import { IInputPostEntity, IPostEntity } from '@domain/entities/post'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type IInputCreatePostDto = IInputPostEntity
export type IOutputCreatePostDto = Either<IError, IPostEntity>

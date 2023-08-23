import { IsNotEmpty, IsString } from 'class-validator'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'
import { AbstractSerializer } from '../abstractSerializer'

export type IOutputHandleWebsocket = Either<IError, void>
export type IInputHandleWebsocket = {
  eventType: string
  connectionId: string
}

export class InputHandleWebsocket extends AbstractSerializer<IInputHandleWebsocket> {
  @IsString()
  @IsNotEmpty()
  eventType: string

  @IsString()
  @IsNotEmpty()
  connectionId: string
}

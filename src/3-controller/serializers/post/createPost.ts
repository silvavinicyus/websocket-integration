import { IsNotEmpty, IsString } from 'class-validator'
import { IInputCreatePostDto } from '@business/dto/post/createPostDto'
import { AbstractSerializer } from '../abstractSerializer'

export class InputCreatePost extends AbstractSerializer<IInputCreatePostDto> {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsString()
  @IsNotEmpty()
  type: string
}

import { AbstractEntity } from '@domain/abstractEntity'
import { ITimestamps } from '@domain/timestamps'
import { right, Right } from '@shared/either'

export interface IPostEntity extends ITimestamps {
  id: number
  uuid: string
  title: string
  content: string
  type: string
}

export type IInputPostEntity = Pick<IPostEntity, 'title' | 'content' | 'type'>

export class PostEntity extends AbstractEntity<IPostEntity> {
  static create(
    props: IInputPostEntity,
    currentDate: Date
  ): Right<void, PostEntity> {
    const postEntity = new PostEntity({
      id: undefined,
      uuid: undefined,
      created_at: currentDate,
      updated_at: currentDate,
      ...props,
    })
    return right(postEntity)
  }

  static update(
    props: Partial<IPostEntity>,
    currentDate: Date
  ): Right<void, PostEntity> {
    const postEntity = new PostEntity({
      ...props,
      updated_at: currentDate,
    } as IPostEntity)
    return right(postEntity)
  }
}

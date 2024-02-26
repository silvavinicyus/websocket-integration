import { AbstractEntity } from '@domain/abstractEntity'
import { ITimestamps } from '@domain/timestamps'
import { right, Right } from '@shared/either'

export interface IConnectionEntity extends ITimestamps {
  id: number
  connectionId: string
}

export type IInputConnectionEntity = Pick<IConnectionEntity, 'connectionId'>

export class ConnectionEntity extends AbstractEntity<IConnectionEntity> {
  static create(
    props: IInputConnectionEntity,
    currentDate: Date
  ): Right<void, ConnectionEntity> {
    const postEntity = new ConnectionEntity({
      id: undefined,
      created_at: currentDate,
      updated_at: currentDate,
      ...props,
    })
    return right(postEntity)
  }

  static update(
    props: Partial<IConnectionEntity>,
    currentDate: Date
  ): Right<void, ConnectionEntity> {
    const postEntity = new ConnectionEntity({
      ...props,
      updated_at: currentDate,
    } as IConnectionEntity)
    return right(postEntity)
  }
}

import { List } from 'src/list/entities/list.entity'
import { Comment } from 'src/comment/entities/comment.entity'
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Card } from 'src/card/entities/card.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string | null

  @Column()
  email: string

  @Column()
  password: string

  @OneToMany(() => List, (list) => list.user_id)
  list_id: List[]

  @OneToMany(() => Comment, (comment) => comment.user_id)
  comment_id: Comment[]

  @OneToMany(() => Card, (card) => card.user_id)
  card_id: Card[]
}

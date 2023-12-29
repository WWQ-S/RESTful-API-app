import { Comment } from 'src/comment/entities/comment.entity'
import { List } from 'src/list/entities/list.entity'
import { User } from 'src/user/entities/user.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Card {
  @PrimaryGeneratedColumn({ name: 'card_id' })
  id: number

  @ManyToOne(() => List, (list) => list.card_id)
  list_id: List

  @ManyToOne(() => User, (user) => user.card_id)
  user_id: User

  @OneToMany(() => Comment, (comment) => comment.card_id)
  comment_id: Comment[]

  @Column()
  title: string

  @Column()
  body: string
}

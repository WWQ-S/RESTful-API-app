import { Comment } from 'src/comment/entities/comment.entity'
import { List } from 'src/list/entities/list.entity'
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

  @OneToMany(() => Comment, (comment) => comment.card_id)
  comment_id: Comment[]
}

import { Card } from 'src/card/entities/card.entity'
import { User } from 'src/user/entities/user.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn({ name: 'comment_id' })
  id: number

  @Column()
  body: string

  @ManyToOne(() => Card, (card) => card.comment_id)
  card_id: Card

  @ManyToOne(() => User, (user) => user.comment_id)
  user_id: User
}

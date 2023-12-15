import { Card } from 'src/card/entities/card.entity'
import { User } from 'src/user/entities/user.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class List {
  @PrimaryGeneratedColumn({ name: 'column_id' })
  id: number

  @Column()
  header: string

  @ManyToOne(() => User, (user) => user.list_id)
  user_id: User

  @OneToMany(() => Card, (card) => card.list_id)
  card_id: Card[]
}

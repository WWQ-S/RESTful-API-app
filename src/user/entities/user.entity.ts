import { List } from 'src/list/entities/list.entity'
import { Comment } from 'src/comment/entities/comment.entity'
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number

  @Column()
  firstName: string | null

  @Column()
  lastName: string | null

  @Column()
  email: string

  @Column()
  password: string

  @OneToMany(() => List, (list) => list.user_id)
  //@JoinColumn({ name: 'user_idDEWQ' })
  list_id: List[]

  @OneToMany(() => Comment, (comment) => comment.user_id)
  comment_id: Comment[]
}

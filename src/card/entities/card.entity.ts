import { IsInt } from 'class-validator';
import { Comment } from 'src/comment/entities/comment.entity';
import { List } from 'src/list/entities/list.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn({ name: 'card_id' })
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @IsInt()
  @Column()
  listId: number;

  @IsInt()
  @Column()
  userId: number;

  @ManyToOne(() => List, (list) => list.card, { onDelete: 'CASCADE' })
  list: List;

  @ManyToOne(() => User, (user) => user.cards, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.card)
  comments: Comment[];
}

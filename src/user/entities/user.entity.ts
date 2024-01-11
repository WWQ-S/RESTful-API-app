import { List } from 'src/list/entities/list.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from 'src/card/entities/card.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string | null;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => List, (list) => list.user)
  lists: List[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Card, (card) => card.user)
  cards: Card[];
}

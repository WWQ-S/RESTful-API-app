import { IsInt, IsNotEmpty } from 'class-validator';
import { Card } from 'src/card/entities/card.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class List {
  @PrimaryGeneratedColumn({ name: 'column_id' })
  id: number;

  @Column()
  title: string;

  @IsInt()
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.lists, { onDelete: 'CASCADE' })
  user: User;

  @IsNotEmpty()
  @OneToMany(() => Card, (card) => card.list)
  card: Card[];
}

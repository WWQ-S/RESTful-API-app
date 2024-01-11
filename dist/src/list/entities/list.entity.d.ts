import { Card } from 'src/card/entities/card.entity';
import { User } from 'src/user/entities/user.entity';
export declare class List {
    id: number;
    title: string;
    userId: number;
    user: User;
    card: Card[];
}

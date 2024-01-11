import { Card } from 'src/card/entities/card.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Comment {
    id: number;
    body: string;
    cardId: number;
    card: Card;
    userId: number;
    user: User;
}

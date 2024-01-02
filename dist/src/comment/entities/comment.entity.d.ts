import { Card } from 'src/card/entities/card.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Comment {
    id: number;
    body: string;
    card_id: Card;
    user_id: User;
}

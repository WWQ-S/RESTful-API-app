import { Card } from 'src/card/entities/card.entity';
import { User } from 'src/user/entities/user.entity';
export declare class List {
    id: number;
    header: string;
    user_id: User;
    card_id: Card[];
}
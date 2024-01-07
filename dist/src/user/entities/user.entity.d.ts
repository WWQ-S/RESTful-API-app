import { List } from 'src/list/entities/list.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Card } from 'src/card/entities/card.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string | null;
    email: string;
    password: string;
    list_id: List[];
    comment_id: Comment[];
    card_id: Card[];
}

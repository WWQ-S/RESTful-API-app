import { Comment } from 'src/comment/entities/comment.entity';
import { List } from 'src/list/entities/list.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Card {
    id: number;
    list_id: List;
    user_id: User;
    comment_id: Comment[];
    title: string;
    body: string;
}

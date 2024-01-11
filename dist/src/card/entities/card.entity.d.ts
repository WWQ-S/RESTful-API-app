import { Comment } from 'src/comment/entities/comment.entity';
import { List } from 'src/list/entities/list.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Card {
    id: number;
    title: string;
    body: string;
    listId: number;
    userId: number;
    list: List;
    user: User;
    comments: Comment[];
}

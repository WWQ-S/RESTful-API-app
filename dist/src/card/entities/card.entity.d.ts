import { Comment } from 'src/comment/entities/comment.entity';
import { List } from 'src/list/entities/list.entity';
export declare class Card {
    id: number;
    list_id: List;
    comment_id: Comment[];
}

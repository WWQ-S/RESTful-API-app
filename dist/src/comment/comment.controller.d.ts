import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(createCommentDto: CreateCommentDto, req: any): Promise<{
        body: string;
        card_id: import("../card/entities/card.entity").Card;
        user_id: {
            id: number;
        };
    } & import("./entities/comment.entity").Comment>;
    findAll(req: any): Promise<import("./entities/comment.entity").Comment[]>;
    findOne(id: string, req: any): Promise<import("./entities/comment.entity").Comment>;
    update(id: string, updateCommentDto: UpdateCommentDto, req: any): Promise<import("typeorm").UpdateResult>;
    remove(id: string, req: any): Promise<string>;
}

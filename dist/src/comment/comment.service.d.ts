import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CardService } from 'src/card/card.service';
export declare class CommentService {
    private commentRepository;
    private cardService;
    constructor(commentRepository: Repository<Comment>, cardService: CardService);
    create(createCommentDto: CreateCommentDto, user_id: number): Promise<{
        body: string;
        cardId: number;
        userId: number;
    } & Comment>;
    findAll(userId: number): Promise<Comment[]>;
    findOne(id: number, userId: number): Promise<Comment>;
    update(id: number, updateCommentDto: UpdateCommentDto, userId: number): Promise<import("typeorm").UpdateResult>;
    remove(id: number, userId: number): Promise<string>;
    checkComment(id: number, userId: number): Promise<Comment>;
}

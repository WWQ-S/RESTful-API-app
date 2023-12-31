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
        card_id: import("../card/entities/card.entity").Card;
        user_id: {
            id: number;
        };
    } & Comment>;
    findAll(user_id: number): Promise<Comment[]>;
    findOne(id: number, user_id: number): Promise<Comment>;
    update(id: number, updateCommentDto: UpdateCommentDto, user_id: number): Promise<import("typeorm").UpdateResult>;
    remove(id: number, user_id: number): Promise<string>;
    ifExist(id: number, user_id: number): Promise<Comment>;
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CardService } from 'src/card/card.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private cardService: CardService,
  ) {}

  async create(createCommentDto: CreateCommentDto, user_id: number) {
    const existCard = await this.cardService.findExistCard(
      createCommentDto.cardId,
    );
    if (existCard) {
      const newComment = {
        body: createCommentDto.body,
        cardId: createCommentDto.cardId,
        userId: user_id,
      };
      return await this.commentRepository.save(newComment);
    }
    throw new NotFoundException('Card not found!');
  }

  async findAll(userId: number) {
    const comment = await this.commentRepository.find({
      where: {
        userId,
      },
    });
    return comment;
  }

  async findOne(id: number, userId: number) {
    return this.checkComment(id, userId);
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, userId: number) {
    const comment = this.checkComment(id, userId);
    if (!comment) throw new NotFoundException('Comment not found!');
    return await this.commentRepository.update(id, updateCommentDto);
  }

  async remove(id: number, userId: number) {
    const comment = await this.checkComment(id, userId);
    if (!comment) throw new NotFoundException('Comment not found!');
    await this.commentRepository.delete(id);
    return `Comment "${(await comment).id}" has been deleted`;
  }

  async checkComment(id: number, userId: number) {
    const comment = await this.commentRepository.findOneOrFail({
      relations: {
        card: true,
        user: true,
      },
      where: {
        id,
        userId,
      },
      select: {
        user: {
          id: true,
          firstName: true,
        },
        card: {
          id: true,
          title: true,
        },
      },
    });
    return comment;
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Comment } from './entities/comment.entity'
import { CardService } from 'src/card/card.service'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private cardService: CardService,
  ) {}

  async create(createCommentDto: CreateCommentDto, user_id: number) {
    const existCard = this.cardService.findExistCard(+createCommentDto.card_id)
    if (existCard) {
      const newComment = {
        body: createCommentDto.body,
        card_id: createCommentDto.card_id,
        user_id: { id: user_id },
      }
      return await this.commentRepository.save(newComment)
    }
    throw new NotFoundException('Card not found!')
  }

  async findAll(user_id: number) {
    const comment = await this.commentRepository.find({
      where: {
        user_id: { id: user_id },
      },
    })
    return comment
  }

  async findOne(id: number, user_id: number) {
    const comment = this.ifExist(id, user_id)
    return comment
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
    user_id: number,
  ) {
    const comment = this.ifExist(id, user_id)
    return await this.commentRepository.update(id, updateCommentDto)
  }

  async remove(id: number, user_id: number) {
    const comment = this.ifExist(id, user_id)
    await this.commentRepository.delete(id)
    return `Comment "${(await comment).id}" has been deleted`
  }

  async ifExist(id: number, user_id: number) {
    const comment = await this.commentRepository.findOne({
      relations: {
        card_id: true,
        user_id: true,
      },
      where: {
        id: id,
        user_id: {
          id: user_id,
        },
      },
      select: {
        user_id: {
          id: true,
          firstName: true,
        },
        card_id: {
          id: true,
          title: true,
        },
      },
    })
    if (!comment) throw new NotFoundException('Comment not found')
    return comment
  }
}

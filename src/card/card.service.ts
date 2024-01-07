import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateCardDto } from './dto/create-card.dto'
import { UpdateCardDto } from './dto/update-card.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Card } from './entities/card.entity'
import { ListService } from 'src/list/list.service'
import { error } from 'console'

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    private listService: ListService,
  ) {}

  async create(createCardDto: CreateCardDto, id: number) {
    const existList = this.listService.findExistList(+createCardDto.list.id)
    if (!existList) return new Error('List not found!')

    const newCard = {
      title: createCardDto.title,
      body: createCardDto.body,
      list_id: { id: createCardDto.list.id },
      user_id: { id },
    }
    return await this.cardRepository.save(newCard)
  }

  async findAll(id: number) {
    const cards = await this.cardRepository.find({
      where: {
        user_id: { id },
      },
      relations: {
        user_id: true,
        list_id: true,
        comment_id: {
          user_id: true,
        },
      },
      select: {
        user_id: {
          firstName: true,
          lastName: true,
        },
        list_id: {
          id: true,
          title: true,
        },
        comment_id: {
          body: true,
          user_id: {
            firstName: true,
          },
        },
      },
    })
    return cards
  }

  async findOne(id: number, user_id: number) {
    const card = await this.ifExist(id, user_id)
    return card
  }

  //This method are calling from 'commentService' class to verify that card existing
  async findExistCard(id: number) {
    const card = await this.cardRepository.findOne({
      where: { id },
    })
    if (card) return true
    else return false
  }

  async update(id: number, updateCardDto: UpdateCardDto, user_id: number) {
    const card = await this.ifExist(id, user_id)
    return await this.cardRepository.update(id, updateCardDto)
  }

  async remove(id: number, user_id: number) {
    const card = await this.ifExist(id, user_id)
    await this.cardRepository.delete(id)
    return `Card "${card.title}" has been deleted`
  }

  async ifExist(id: number, user_id: number) {
    const card = await this.cardRepository.findOne({
      relations: {
        user_id: true,
        list_id: true,
        comment_id: true,
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
        },
      },
    })
    if (!card) throw new NotFoundException('Card not found!')
    return card
  }
}

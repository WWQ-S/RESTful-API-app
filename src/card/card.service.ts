import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { ListService } from 'src/list/list.service';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    private listService: ListService,
  ) {}

  async create(createCardDto: CreateCardDto, id: number) {
    const IfExistList = await this.listService.findExistList(
      +createCardDto.listId,
    );

    if (!IfExistList) return IfExistList;

    const newCard = {
      title: createCardDto.title,
      body: createCardDto.body,
      listId: createCardDto.listId,
      userId: id,
    };
    return await this.cardRepository.save(newCard);
  }

  async findAll(userId: number) {
    const cards = await this.cardRepository.find({
      where: {
        userId,
      },
      relations: {
        user: true,
        list: true,
        comments: {
          user: true,
        },
      },
      select: {
        user: {
          firstName: true,
          lastName: true,
        },
        list: {
          id: true,
          title: true,
        },
        comments: {
          body: true,
          user: {
            firstName: true,
          },
        },
      },
    });
    return cards;
  }

  async findOne(id: number, userId: number) {
    return await this.checkCard(id, userId);
  }

  //This method are calling from 'commentService' class to verify that card existing
  async findExistCard(id: number) {
    const card = await this.cardRepository.findOne({
      where: { id },
    });
    if (card) return true;
    else return false;
  }

  async update(id: number, updateCardDto: UpdateCardDto, userId: number) {
    const card = await this.checkCard(id, userId);
    if (!card) throw new NotFoundException('Card not found!');
    return await this.cardRepository.update(id, updateCardDto);
  }

  async remove(id: number, userId: number) {
    const card = await this.checkCard(id, userId);
    if (!card) throw new NotFoundException('Card not found!');
    await this.cardRepository.delete(id);
    return `Card "${card.title}" has been deleted`;
  }

  async checkCard(id: number, userId: number) {
    const card = await this.cardRepository.findOneOrFail({
      relations: {
        user: true,
        list: true,
        comments: true,
      },
      where: {
        id,
        user: {
          id: userId,
        },
      },
      select: {
        user: {
          id: true,
        },
      },
    });
    return card;
  }
}

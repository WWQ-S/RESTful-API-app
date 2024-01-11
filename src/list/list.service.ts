import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>,
  ) {}

  async create(createListDto: CreateListDto, id: number) {
    const checkList = await this.listRepository.findOne({
      where: {
        userId: id,
        title: createListDto.title,
      },
    });
    if (checkList) {
      throw new BadRequestException('This list already exist');
    }
    await this.listRepository.save({
      title: createListDto.title,
      userId: id,
    });
    return await this.listRepository.findOne({
      where: { title: createListDto.title },
      relations: {
        user: true,
      },
    });
  }

  async findAll(userId: number) {
    return await this.listRepository.find({
      where: {
        userId,
      },
      relations: {
        card: true,
        user: true,
      },
      select: {
        user: {
          id: true,
          firstName: true,
        },
      },
    });
  }

  async findOne(id: number, userId: number) {
    return await this.checkList(id, userId);
  }

  //This method are calling from 'cardService' class to verify that list existing
  async findExistList(id: number) {
    return await this.listRepository.findOneOrFail({
      where: { id },
    });
  }

  async update(id: number, updateListDto: UpdateListDto, userId: number) {
    const list = await this.checkList(id, userId);
    if (!list) throw new NotFoundException('List not found');
    return await this.listRepository.update(id, updateListDto);
  }

  async remove(id: number, userId: number) {
    const list = await this.checkList(id, userId);
    if (!list) throw new NotFoundException('List not found');
    await this.listRepository.delete(id);
    return `List "${list.title}" has been deleted`;
  }

  async checkList(id: number, userId: number) {
    const list = await this.listRepository.findOneOrFail({
      relations: {
        user: true,
        card: true,
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
    return list;
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateListDto } from './dto/create-list.dto'
import { UpdateListDto } from './dto/update-list.dto'
import { Repository } from 'typeorm'
import { List } from './entities/list.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { NotFoundError } from 'rxjs'

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>,
  ) {}

  async create(createListDto: CreateListDto, id: number) {
    const ifExist = await this.listRepository.findBy({
      user_id: { id },
      title: createListDto.title,
    })

    if (ifExist.length) {
      throw new BadRequestException('This list already exist')
    }

    const newList = await this.listRepository.save({
      title: createListDto.title,
      user_id: { id },
    })
    const list = await this.listRepository.findOne({
      where: { title: createListDto.title },
      relations: {
        user_id: true,
      },
    })
    return list
  }

  async findAll(id: number) {
    const findLists = await this.listRepository.find({
      where: {
        user_id: { id },
      },
      relations: {
        card_id: true,
        user_id: true,
      },
      select: {
        user_id: {
          id: true,
          firstName: true,
        },
      },
    })
    return findLists
  }

  async findOne(id: number, user_id: number) {
    const oneList = await this.ifExist(id, user_id)
    return oneList
  }

  async update(id: number, updateListDto: UpdateListDto, user_id: number) {
    const list = await this.ifExist(id, user_id)
    return await this.listRepository.update(id, updateListDto)
  }

  async remove(id: number, user_id: number) {
    const list = await this.ifExist(id, user_id)
    const delList = await this.listRepository.delete(id)
    return `List "${list.title}" has been deleted`
  }

  async ifExist(id: number, user_id: number) {
    const list = await this.listRepository.findOne({
      relations: {
        user_id: true,
        card_id: true,
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
    if (!list) throw new NotFoundException('List not found')
    return list
  }
}

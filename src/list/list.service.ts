import { Injectable } from '@nestjs/common'
import { CreateListDto } from './dto/create-list.dto'
import { UpdateListDto } from './dto/update-list.dto'

@Injectable()
export class ListService {
  create(createColumnDto: CreateListDto) {
    return 'This action adds a new column'
  }

  findAll() {
    return `This action returns all column`
  }

  findOne(id: number) {
    return `This action returns a #${id} column`
  }

  update(id: number, updateColumnDto: UpdateListDto) {
    return `This action updates a #${id} column`
  }

  remove(id: number) {
    return `This action removes a #${id} column`
  }
}

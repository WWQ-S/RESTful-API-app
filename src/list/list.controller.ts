import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ListService } from './list.service'
import { CreateListDto } from './dto/create-list.dto'
import { UpdateListDto } from './dto/update-list.dto'

@Controller('column')
export class ListController {
  constructor(private readonly columnService: ListService) {}

  @Post()
  create(@Body() createColumnDto: CreateListDto) {
    return this.columnService.create(createColumnDto)
  }

  @Get()
  findAll() {
    return this.columnService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.columnService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateListDto) {
    return this.columnService.update(+id, updateColumnDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnService.remove(+id)
  }
}

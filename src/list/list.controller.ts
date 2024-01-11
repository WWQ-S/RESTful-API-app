import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('List')
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post('create')
  @ApiOkResponse({ description: 'List created' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async create(@Body() createListDto: CreateListDto, @Req() req) {
    try {
      return await this.listService.create(createListDto, +req.user.id);
    } catch (error) {
      throw new NotFoundException(
        `List '${createListDto.title}' already exist`,
      );
    }
  }

  @Get('find')
  @ApiOkResponse({ description: 'Lists received' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req) {
    const lists = await this.listService.findAll(+req.user.id);
    if (lists.length === 0)
      throw new NotFoundException('Your lists have not found');
    return lists;
  }

  @Get(':id')
  @ApiOkResponse({ description: 'List received' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'List not found' })
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Req() req) {
    try {
      return await this.listService.findOne(+id, +req.user.id);
    } catch (error) {
      throw new NotFoundException('Your list have not found');
    }
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'List updated' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'List not found' })
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateListDto: UpdateListDto,
    @Req() req,
  ) {
    try {
      return await this.listService.update(+id, updateListDto, +req.user.id);
    } catch (error) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'List deleted' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'List not found' })
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Req() req) {
    try {
      return await this.listService.remove(+id, +req.user.id);
    } catch (error) {
      throw new NotFoundException(`List with ID ${id} not found`);
    }
  }
}

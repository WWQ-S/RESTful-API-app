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
} from '@nestjs/common'
import { ListService } from './list.service'
import { CreateListDto } from './dto/create-list.dto'
import { UpdateListDto } from './dto/update-list.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

@ApiTags('List')
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post('create')
  @ApiOkResponse({ description: 'List created' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createListDto: CreateListDto, @Req() req) {
    return this.listService.create(createListDto, +req.user.id)
  }

  @Get('find')
  @ApiOkResponse({ description: 'Lists received' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.listService.findAll(+req.user.id)
  }

  @Get(':id')
  @ApiOkResponse({ description: 'List received' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'List not found' })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Req() req) {
    return this.listService.findOne(+id, +req.user.id)
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'List updated' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'List not found' })
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateListDto: UpdateListDto,
    @Req() req,
  ) {
    return this.listService.update(+id, updateListDto, +req.user.id)
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'List deleted' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'List not found' })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req) {
    return this.listService.remove(+id, +req.user.id)
  }
}

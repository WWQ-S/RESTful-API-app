import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  UseGuards,
  Req,
} from '@nestjs/common'
import { CardService } from './card.service'
import { CreateCardDto } from './dto/create-card.dto'
import { UpdateCardDto } from './dto/update-card.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('newCard')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  create(@Body() createCardDto: CreateCardDto, @Req() req) {
    return this.cardService.create(createCardDto, +req.user.id)
  }

  @Get('findCards')
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.cardService.findAll(+req.user.id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Req() req) {
    return this.cardService.findOne(+id, +req.user.id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
    @Req() req,
  ) {
    return this.cardService.update(+id, updateCardDto, +req.user.id)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req) {
    return this.cardService.remove(+id, +req.user.id)
  }
}

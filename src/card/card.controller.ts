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
  NotFoundException,
} from '@nestjs/common'
import { CardService } from './card.service'
import { CreateCardDto } from './dto/create-card.dto'
import { UpdateCardDto } from './dto/update-card.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

@ApiTags('Card')
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('newCard')
  @ApiCreatedResponse({ description: 'Card created' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  create(@Body() createCardDto: CreateCardDto, @Req() req) {
    return this.cardService.create(createCardDto, +req.user.id)
  }

  @Get('findCards')
  @ApiOkResponse({ description: 'User cards received' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.cardService.findAll(+req.user.id)
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User card received' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Req() req) {
    return this.cardService.findOne(+id, +req.user.id)
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Card updated' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
    @Req() req,
  ) {
    return this.cardService.update(+id, updateCardDto, +req.user.id)
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Card deleted' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req) {
    return this.cardService.remove(+id, +req.user.id)
  }
}

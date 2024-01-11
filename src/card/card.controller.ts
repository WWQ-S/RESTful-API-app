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
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Card')
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post('newCard')
  @ApiCreatedResponse({ description: 'Card created' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  async create(@Body() createCardDto: CreateCardDto, @Req() req) {
    try {
      return await this.cardService.create(createCardDto, req.user.id);
    } catch (error) {
      throw new NotFoundException(
        `List with ID '${createCardDto.listId}' not found`,
      );
    }
  }

  @Get()
  @ApiOkResponse({ description: 'User cards received' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.cardService.findAll(+req.user.id);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User card received' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Req() req) {
    try {
      return await this.cardService.findOne(+id, +req.user.id);
    } catch (error) {
      throw new NotFoundException(
        `Card with ID '${id}' not found in yours cards`,
      );
    }
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Card updated' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
    @Req() req,
  ) {
    try {
      return await this.cardService.update(+id, updateCardDto, +req.user.id);
    } catch (error) {
      throw new NotFoundException(
        `Card with ID '${id}' not found in yours cards`,
      );
    }
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Card deleted' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Req() req) {
    try {
      return await this.cardService.remove(+id, +req.user.id);
    } catch (error) {
      throw new NotFoundException(
        `Card with ID '${id}' not found in yours cards`,
      );
    }
  }
}

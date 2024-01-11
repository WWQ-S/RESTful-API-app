import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UsePipes,
  NotFoundException,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('newComment')
  @ApiCreatedResponse({ description: 'Comment created' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(LocalAuthGuard)
  async create(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    try {
      return await this.commentService.create(createCommentDto, +req.user.id);
    } catch (error) {
      throw new NotFoundException(
        `Card with ID "${createCommentDto.cardId}" not found`,
      );
    }
  }

  @Get('findComments')
  @ApiOkResponse({ description: 'User comments received' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.commentService.findAll(+req.user.id);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User comment received' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Req() req) {
    try {
      return await this.commentService.findOne(+id, +req.user.id);
    } catch (error) {
      throw new NotFoundException(`Comment with ID '${id}' not found`);
    }
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Comment updated' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req,
  ) {
    try {
      return await this.commentService.update(
        +id,
        updateCommentDto,
        +req.user.id,
      );
    } catch (error) {
      throw new NotFoundException(`Comment with ID '${id}' not found`);
    }
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Comment deleted' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Req() req) {
    try {
      return await this.commentService.remove(+id, +req.user.id);
    } catch (error) {
      throw new NotFoundException(`Comment with ID '${id}' not found`);
    }
  }
}

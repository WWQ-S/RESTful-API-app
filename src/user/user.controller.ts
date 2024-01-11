import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @ApiOkResponse({ description: 'User created' })
  @ApiResponse({
    status: 400,
    schema: {
      anyOf: [
        {
          title: 'E-mail',
          description: 'Incorrect email',
          example: 'Incorrect email',
        },
        {
          title: 'Password',
          description: 'Incorrect password',
          example: 'Incorrect password',
        },
        {
          title: 'Firstname',
          description: 'Firstname required property',
          example: 'Firstname required property',
        },
      ],
    },
  })
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new NotFoundException(`This email address is already registered`);
    }
  }

  @Get('findAll')
  @ApiOkResponse({ description: 'User received' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User received' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number) {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      throw new NotFoundException(`User with ID '${id}' not found`);
    }
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'User deleted' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number, @Req() req) {
    try {
      return await this.userService.removeUser(id, +req.user.id);
    } catch (error) {
      throw new NotFoundException(`User with ID '${id}' not found`);
    }
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'User upadated' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiResponse({
    status: 400,
    schema: {
      anyOf: [
        {
          title: 'E-mail',
          description: 'Incorrect email',
          example: 'Incorrect email',
        },
        {
          title: 'Password',
          description: 'Incorrect password',
          example: 'Incorrect password',
        },
        {
          title: 'Firstname',
          description: 'Firstname required property',
          example: 'Firstname required property',
        },
      ],
    },
  })
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    return this.userService.updateDataUser(+id, updateUserDto, req.user);
  }
}

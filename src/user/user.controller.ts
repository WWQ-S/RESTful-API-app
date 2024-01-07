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
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

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
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User received' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id)
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'User deleted' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: number, @Req() req) {
    return this.userService.removeUser(+id, req.user)
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'User upadated' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
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
    return this.userService.updateDataUser(+id, updateUserDto, req.user)
  }
}

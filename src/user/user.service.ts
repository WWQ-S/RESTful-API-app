import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import * as argon2 from 'argon2'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isExistUser = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    })
    if (isExistUser) throw new BadRequestException('This email already exist')

    const user = await this.usersRepository.save({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
    })
    return { user }
  }

  async findOne(email: string) {
    return await this.usersRepository.findOne({
      where: {
        email,
      },
    })
  }
}

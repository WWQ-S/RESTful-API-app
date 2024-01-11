import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const checkUser = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (checkUser) throw new BadRequestException('This email already exist');

    return await this.usersRepository.save({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
    });
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findUserForLogin(email: string) {
    return await this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async removeUser(id: number, userId: number) {
    const user = await this.usersRepository.findOneOrFail({
      where: {
        id,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    if ((id = userId)) await this.usersRepository.delete(id);
    else throw new UnauthorizedException('You are not owner of this account');
    return `Your account with ID '${id}' has been deleted`;
  }

  async updateDataUser(id: number, updateUserDto: UpdateUserDto, user: User) {
    const userObj = await this.usersRepository.findOneOrFail({
      where: {
        id,
      },
    });
    if (!userObj) throw new NotFoundException('User not found');
    if ((id = user.id)) await this.usersRepository.update(id, updateUserDto);
    else throw new UnauthorizedException('You are not owner of this account');
    return `Your account "${user.email}" has been updated`;
  }
}

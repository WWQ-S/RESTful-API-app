import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UserService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    } & User>;
    findOne(id: number): Promise<User>;
    findAll(): Promise<User[]>;
    findUserForLogin(email: string): Promise<User>;
    removeUser(id: number, userId: number): Promise<string>;
    updateDataUser(id: number, updateUserDto: UpdateUserDto, user: User): Promise<string>;
}

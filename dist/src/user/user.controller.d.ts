import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        user: {
            email: string;
            password: string;
            firstName: string;
            lastName: string;
        } & import("./entities/user.entity").User;
    }>;
    findOne(id: number): Promise<import("./entities/user.entity").User>;
    delete(id: number, req: any): Promise<string>;
    update(id: number, updateUserDto: UpdateUserDto, req: any): Promise<string>;
}

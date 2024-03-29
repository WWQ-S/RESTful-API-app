"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const argon2 = require("argon2");
let UserService = class UserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(createUserDto) {
        const checkUser = await this.usersRepository.findOne({
            where: {
                email: createUserDto.email,
            },
        });
        if (checkUser)
            throw new common_1.BadRequestException('This email already exist');
        return await this.usersRepository.save({
            email: createUserDto.email,
            password: await argon2.hash(createUserDto.password),
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
        });
    }
    async findOne(id) {
        return await this.usersRepository.findOneOrFail({
            where: {
                id,
            },
        });
    }
    async findAll() {
        return await this.usersRepository.find();
    }
    async findUserForLogin(email) {
        return await this.usersRepository.findOne({
            where: {
                email,
            },
        });
    }
    async removeUser(id, userId) {
        const user = await this.usersRepository.findOneOrFail({
            where: {
                id,
            },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if ((id = userId))
            await this.usersRepository.delete(id);
        else
            throw new common_1.UnauthorizedException('You are not owner of this account');
        return `Your account with ID '${id}' has been deleted`;
    }
    async updateDataUser(id, updateUserDto, user) {
        const userObj = await this.usersRepository.findOneOrFail({
            where: {
                id,
            },
        });
        if (!userObj)
            throw new common_1.NotFoundException('User not found');
        if ((id = user.id))
            await this.usersRepository.update(id, updateUserDto);
        else
            throw new common_1.UnauthorizedException('You are not owner of this account');
        return `Your account "${user.email}" has been updated`;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map
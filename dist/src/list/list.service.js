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
exports.ListService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const list_entity_1 = require("./entities/list.entity");
const typeorm_2 = require("@nestjs/typeorm");
let ListService = class ListService {
    constructor(listRepository) {
        this.listRepository = listRepository;
    }
    async create(createListDto, id) {
        const ifExist = await this.listRepository.findBy({
            user_id: { id },
            title: createListDto.title,
        });
        if (ifExist.length) {
            throw new common_1.BadRequestException('This list already exist');
        }
        const newList = await this.listRepository.save({
            title: createListDto.title,
            user_id: { id },
        });
        const list = await this.listRepository.findOne({
            where: { title: createListDto.title },
            relations: {
                user_id: true,
            },
        });
        return list;
    }
    async findAll(id) {
        const findLists = await this.listRepository.find({
            where: {
                user_id: { id },
            },
            relations: {
                card_id: true,
                user_id: true,
            },
            select: {
                user_id: {
                    id: true,
                    firstName: true,
                },
            },
        });
        return findLists;
    }
    async findOne(id, user_id) {
        const oneList = await this.ifExist(id, user_id);
        return oneList;
    }
    async update(id, updateListDto, user_id) {
        const list = await this.ifExist(id, user_id);
        return await this.listRepository.update(id, updateListDto);
    }
    async remove(id, user_id) {
        const list = await this.ifExist(id, user_id);
        const delList = await this.listRepository.delete(id);
        return `List "${list.title}" has been deleted`;
    }
    async ifExist(id, user_id) {
        const list = await this.listRepository.findOne({
            relations: {
                user_id: true,
                card_id: true,
            },
            where: {
                id: id,
                user_id: {
                    id: user_id,
                },
            },
            select: {
                user_id: {
                    id: true,
                },
            },
        });
        if (!list)
            throw new common_1.NotFoundException('List not found');
        return list;
    }
};
exports.ListService = ListService;
exports.ListService = ListService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(list_entity_1.List)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ListService);
//# sourceMappingURL=list.service.js.map
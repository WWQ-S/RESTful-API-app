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
exports.CardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const card_entity_1 = require("./entities/card.entity");
const list_service_1 = require("../list/list.service");
let CardService = class CardService {
    constructor(cardRepository, listService) {
        this.cardRepository = cardRepository;
        this.listService = listService;
    }
    async create(createCardDto, id) {
        const existList = this.listService.findExistList(+createCardDto.list.id);
        if (!existList)
            return new Error('List not found!');
        const newCard = {
            title: createCardDto.title,
            body: createCardDto.body,
            list_id: { id: createCardDto.list.id },
            user_id: { id },
        };
        return await this.cardRepository.save(newCard);
    }
    async findAll(id) {
        const cards = await this.cardRepository.find({
            where: {
                user_id: { id },
            },
            relations: {
                user_id: true,
                list_id: true,
                comment_id: {
                    user_id: true,
                },
            },
            select: {
                user_id: {
                    firstName: true,
                    lastName: true,
                },
                list_id: {
                    id: true,
                    title: true,
                },
                comment_id: {
                    body: true,
                    user_id: {
                        firstName: true,
                    },
                },
            },
        });
        return cards;
    }
    async findOne(id, user_id) {
        const card = await this.ifExist(id, user_id);
        return card;
    }
    async findExistCard(id) {
        const card = await this.cardRepository.findOne({
            where: { id },
        });
        if (card)
            return true;
        else
            return false;
    }
    async update(id, updateCardDto, user_id) {
        const card = await this.ifExist(id, user_id);
        return await this.cardRepository.update(id, updateCardDto);
    }
    async remove(id, user_id) {
        const card = await this.ifExist(id, user_id);
        await this.cardRepository.delete(id);
        return `Card "${card.title}" has been deleted`;
    }
    async ifExist(id, user_id) {
        const card = await this.cardRepository.findOne({
            relations: {
                user_id: true,
                list_id: true,
                comment_id: true,
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
        if (!card)
            throw new common_1.NotFoundException('Card not found!');
        return card;
    }
};
exports.CardService = CardService;
exports.CardService = CardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(card_entity_1.Card)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        list_service_1.ListService])
], CardService);
//# sourceMappingURL=card.service.js.map
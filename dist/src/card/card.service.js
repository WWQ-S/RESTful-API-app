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
        const IfExistList = await this.listService.findExistList(+createCardDto.listId);
        if (!IfExistList)
            return IfExistList;
        const newCard = {
            title: createCardDto.title,
            body: createCardDto.body,
            listId: createCardDto.listId,
            userId: id,
        };
        return await this.cardRepository.save(newCard);
    }
    async findAll(userId) {
        const cards = await this.cardRepository.find({
            where: {
                userId,
            },
            relations: {
                user: true,
                list: true,
                comments: {
                    user: true,
                },
            },
            select: {
                user: {
                    firstName: true,
                    lastName: true,
                },
                list: {
                    id: true,
                    title: true,
                },
                comments: {
                    body: true,
                    user: {
                        firstName: true,
                    },
                },
            },
        });
        return cards;
    }
    async findOne(id, userId) {
        return await this.checkCard(id, userId);
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
    async update(id, updateCardDto, userId) {
        const card = await this.checkCard(id, userId);
        if (!card)
            throw new common_1.NotFoundException('Card not found!');
        return await this.cardRepository.update(id, updateCardDto);
    }
    async remove(id, userId) {
        const card = await this.checkCard(id, userId);
        if (!card)
            throw new common_1.NotFoundException('Card not found!');
        await this.cardRepository.delete(id);
        return `Card "${card.title}" has been deleted`;
    }
    async checkCard(id, userId) {
        const card = await this.cardRepository.findOneOrFail({
            relations: {
                user: true,
                list: true,
                comments: true,
            },
            where: {
                id,
                user: {
                    id: userId,
                },
            },
            select: {
                user: {
                    id: true,
                },
            },
        });
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
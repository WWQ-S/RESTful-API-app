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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const comment_entity_1 = require("./entities/comment.entity");
const card_service_1 = require("../card/card.service");
let CommentService = class CommentService {
    constructor(commentRepository, cardService) {
        this.commentRepository = commentRepository;
        this.cardService = cardService;
    }
    async create(createCommentDto, user_id) {
        const existCard = await this.cardService.findExistCard(createCommentDto.cardId);
        if (existCard) {
            const newComment = {
                body: createCommentDto.body,
                cardId: createCommentDto.cardId,
                userId: user_id,
            };
            return await this.commentRepository.save(newComment);
        }
        throw new common_1.NotFoundException('Card not found!');
    }
    async findAll(userId) {
        const comment = await this.commentRepository.find({
            where: {
                userId,
            },
        });
        return comment;
    }
    async findOne(id, userId) {
        return this.checkComment(id, userId);
    }
    async update(id, updateCommentDto, userId) {
        const comment = this.checkComment(id, userId);
        if (!comment)
            throw new common_1.NotFoundException('Comment not found!');
        return await this.commentRepository.update(id, updateCommentDto);
    }
    async remove(id, userId) {
        const comment = await this.checkComment(id, userId);
        if (!comment)
            throw new common_1.NotFoundException('Comment not found!');
        await this.commentRepository.delete(id);
        return `Comment "${(await comment).id}" has been deleted`;
    }
    async checkComment(id, userId) {
        const comment = await this.commentRepository.findOneOrFail({
            relations: {
                card: true,
                user: true,
            },
            where: {
                id,
                userId,
            },
            select: {
                user: {
                    id: true,
                    firstName: true,
                },
                card: {
                    id: true,
                    title: true,
                },
            },
        });
        return comment;
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        card_service_1.CardService])
], CommentService);
//# sourceMappingURL=comment.service.js.map
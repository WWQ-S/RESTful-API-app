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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const comment_service_1 = require("./comment.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const update_comment_dto_1 = require("./dto/update-comment.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const local_auth_guard_1 = require("../auth/guards/local-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async create(createCommentDto, req) {
        try {
            return await this.commentService.create(createCommentDto, +req.user.id);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Card with ID "${createCommentDto.cardId}" not found`);
        }
    }
    findAll(req) {
        return this.commentService.findAll(+req.user.id);
    }
    async findOne(id, req) {
        try {
            return await this.commentService.findOne(+id, +req.user.id);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Comment with ID '${id}' not found`);
        }
    }
    async update(id, updateCommentDto, req) {
        try {
            return await this.commentService.update(+id, updateCommentDto, +req.user.id);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Comment with ID '${id}' not found`);
        }
    }
    async remove(id, req) {
        try {
            return await this.commentService.remove(+id, +req.user.id);
        }
        catch (error) {
            throw new common_1.NotFoundException(`Comment with ID '${id}' not found`);
        }
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, common_1.Post)('newComment'),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Comment created' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(local_auth_guard_1.LocalAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('findComments'),
    (0, swagger_1.ApiOkResponse)({ description: 'User comments received' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'User comment received' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Comment not found' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Comment updated' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Comment not found' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_comment_dto_1.UpdateCommentDto, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Comment deleted' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Comment not found' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "remove", null);
exports.CommentController = CommentController = __decorate([
    (0, swagger_1.ApiTags)('Comment'),
    (0, common_1.Controller)('comment'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
//# sourceMappingURL=comment.controller.js.map
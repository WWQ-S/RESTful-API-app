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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const class_validator_1 = require("class-validator");
const comment_entity_1 = require("../../comment/entities/comment.entity");
const list_entity_1 = require("../../list/entities/list.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let Card = class Card {
};
exports.Card = Card;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'card_id' }),
    __metadata("design:type", Number)
], Card.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Card.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Card.prototype, "body", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Card.prototype, "listId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Card.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => list_entity_1.List, (list) => list.card, { onDelete: 'CASCADE' }),
    __metadata("design:type", list_entity_1.List)
], Card.prototype, "list", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.cards, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], Card.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.card),
    __metadata("design:type", Array)
], Card.prototype, "comments", void 0);
exports.Card = Card = __decorate([
    (0, typeorm_1.Entity)()
], Card);
//# sourceMappingURL=card.entity.js.map
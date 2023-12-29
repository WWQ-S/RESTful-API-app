import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
export declare class CardService {
    private cardRepository;
    constructor(cardRepository: Repository<Card>);
    create(createCardDto: CreateCardDto, id: number): Promise<{
        title: string;
        body: string;
        list_id: {
            id: number;
        };
        user_id: {
            id: number;
        };
    } & Card>;
    findAll(id: number): Promise<Card[]>;
    findOne(id: number, user_id: number): Promise<Card>;
    update(id: number, updateCardDto: UpdateCardDto, user_id: number): Promise<import("typeorm").UpdateResult>;
    remove(id: number, user_id: number): Promise<string>;
    ifExist(id: number, user_id: number): Promise<Card>;
}

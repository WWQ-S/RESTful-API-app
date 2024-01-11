import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { ListService } from 'src/list/list.service';
export declare class CardService {
    private cardRepository;
    private listService;
    constructor(cardRepository: Repository<Card>, listService: ListService);
    create(createCardDto: CreateCardDto, id: number): Promise<import("../list/entities/list.entity").List | ({
        title: string;
        body: string;
        listId: number;
        userId: number;
    } & Card)>;
    findAll(userId: number): Promise<Card[]>;
    findOne(id: number, userId: number): Promise<Card>;
    findExistCard(id: number): Promise<boolean>;
    update(id: number, updateCardDto: UpdateCardDto, userId: number): Promise<import("typeorm").UpdateResult>;
    remove(id: number, userId: number): Promise<string>;
    checkCard(id: number, userId: number): Promise<Card>;
}

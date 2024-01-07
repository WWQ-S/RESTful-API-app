import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { ListService } from 'src/list/list.service';
export declare class CardService {
    private cardRepository;
    private listService;
    constructor(cardRepository: Repository<Card>, listService: ListService);
    create(createCardDto: CreateCardDto, id: number): Promise<Error | ({
        title: string;
        body: string;
        list_id: {
            id: number;
        };
        user_id: {
            id: number;
        };
    } & Card)>;
    findAll(id: number): Promise<Card[]>;
    findOne(id: number, user_id: number): Promise<Card>;
    findExistCard(id: number): Promise<boolean>;
    update(id: number, updateCardDto: UpdateCardDto, user_id: number): Promise<import("typeorm").UpdateResult>;
    remove(id: number, user_id: number): Promise<string>;
    ifExist(id: number, user_id: number): Promise<Card>;
}

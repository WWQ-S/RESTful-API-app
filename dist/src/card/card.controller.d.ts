import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
export declare class CardController {
    private readonly cardService;
    constructor(cardService: CardService);
    create(createCardDto: CreateCardDto, req: any): Promise<import("../list/entities/list.entity").List | ({
        title: string;
        body: string;
        listId: number;
        userId: number;
    } & import("./entities/card.entity").Card)>;
    findAll(req: any): Promise<import("./entities/card.entity").Card[]>;
    findOne(id: string, req: any): Promise<import("./entities/card.entity").Card>;
    update(id: string, updateCardDto: UpdateCardDto, req: any): Promise<import("typeorm").UpdateResult>;
    remove(id: string, req: any): Promise<string>;
}

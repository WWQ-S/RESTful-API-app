import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
export declare class ListController {
    private readonly listService;
    constructor(listService: ListService);
    create(createListDto: CreateListDto, req: any): Promise<import("./entities/list.entity").List>;
    findAll(req: any): Promise<import("./entities/list.entity").List[]>;
    findOne(id: string, req: any): Promise<import("./entities/list.entity").List>;
    update(id: string, updateListDto: UpdateListDto, req: any): Promise<import("typeorm").UpdateResult>;
    remove(id: string, req: any): Promise<string>;
}

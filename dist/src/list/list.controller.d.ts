import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
export declare class ListController {
    private readonly columnService;
    constructor(columnService: ListService);
    create(createColumnDto: CreateListDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateColumnDto: UpdateListDto): string;
    remove(id: string): string;
}

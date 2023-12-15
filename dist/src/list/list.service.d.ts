import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
export declare class ListService {
    create(createColumnDto: CreateListDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateColumnDto: UpdateListDto): string;
    remove(id: number): string;
}

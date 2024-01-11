import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
export declare class ListService {
    private listRepository;
    constructor(listRepository: Repository<List>);
    create(createListDto: CreateListDto, id: number): Promise<List>;
    findAll(userId: number): Promise<List[]>;
    findOne(id: number, userId: number): Promise<List>;
    findExistList(id: number): Promise<List>;
    update(id: number, updateListDto: UpdateListDto, userId: number): Promise<import("typeorm").UpdateResult>;
    remove(id: number, userId: number): Promise<string>;
    checkList(id: number, userId: number): Promise<List>;
}

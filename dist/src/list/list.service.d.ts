import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
export declare class ListService {
    private listRepository;
    constructor(listRepository: Repository<List>);
    create(createListDto: CreateListDto, id: number): Promise<List>;
    findAll(id: number): Promise<List[]>;
    findOne(id: number, user_id: number): Promise<List>;
    update(id: number, updateListDto: UpdateListDto, user_id: number): Promise<import("typeorm").UpdateResult>;
    remove(id: number, user_id: number): Promise<string>;
    ifExist(id: number, user_id: number): Promise<List>;
}

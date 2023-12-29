import { IsNotEmpty } from 'class-validator'
import { List } from 'src/list/entities/list.entity'

export class CreateCardDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  body: string

  @IsNotEmpty()
  list: List
}

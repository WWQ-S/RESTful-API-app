import { IsNotEmpty } from 'class-validator'
import { Card } from 'src/card/entities/card.entity'
import { User } from 'src/user/entities/user.entity'

export class CreateCommentDto {
  @IsNotEmpty()
  body: string

  @IsNotEmpty()
  card_id: Card
}

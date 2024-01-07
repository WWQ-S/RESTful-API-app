import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Card } from 'src/card/entities/card.entity'
import { User } from 'src/user/entities/user.entity'

export class CreateCommentDto {
  @ApiProperty({
    description: 'card content text',
  })
  @IsNotEmpty()
  body: string

  @ApiProperty({
    description: 'This field accepting id of existing card',
  })
  @IsNotEmpty()
  card_id: Card
}

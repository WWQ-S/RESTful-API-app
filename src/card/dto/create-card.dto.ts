import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { List } from 'src/list/entities/list.entity'

export class CreateCardDto {
  @ApiProperty({
    description: 'Card title text',
  })
  @IsNotEmpty()
  title: string

  @ApiProperty({
    description: 'Card content text',
  })
  @IsNotEmpty()
  body: string

  @ApiProperty({
    description: 'This field accepting id of existing list',
  })
  @IsNotEmpty()
  list: List
}

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    description: 'Card title text',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Card content text',
  })
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    description: 'This field accepting id of existing list',
  })
  @IsInt()
  listId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'card content text',
  })
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    description: 'This field accepting id of existing card',
  })
  @IsInt()
  cardId: number;
}

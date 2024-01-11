import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateListDto {
  @ApiProperty({
    description: 'List title text',
  })
  @IsNotEmpty()
  title: string;
}

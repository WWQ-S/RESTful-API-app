import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'
import { User } from 'src/user/entities/user.entity'

export class CreateListDto {
  @ApiProperty({
    description: 'List title text',
  })
  @IsNotEmpty()
  title: string
}

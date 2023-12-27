import { IsNotEmpty, IsOptional } from 'class-validator'
import { User } from 'src/user/entities/user.entity'

export class CreateListDto {
  @IsNotEmpty()
  title: string

  //@IsOptional()
  //user_id?: User
}

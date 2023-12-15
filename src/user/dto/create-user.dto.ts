import { IsOptional, IsEmail, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email: string

  @MinLength(6, { message: 'Password are including 6 symbols or more' })
  password: string

  @IsOptional()
  firstName: string

  @IsOptional()
  lastName?: string
}

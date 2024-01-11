import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'E-mail address with validation',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for login',
    minLength: 6,
  })
  @MinLength(6, { message: 'Password are including 6 symbols or more' })
  password: string;
}

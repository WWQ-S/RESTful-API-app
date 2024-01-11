import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'E-mail address with validation',
  })
  @IsEmail(undefined, { message: 'Not a valid e-mail' })
  email: string;

  @ApiProperty({
    description: 'Password for registration',
    minLength: 6,
  })
  @MinLength(6, { message: 'Password are including 6 symbols or more' })
  password: string;

  @ApiProperty({
    description: 'Users firtsname is necessarily',
  })
  @IsNotEmpty({ message: 'Firstname cannot be empty' })
  firstName: string;

  @ApiProperty({
    description: 'Users lastsname is not necessarily',
  })
  @IsOptional()
  lastName?: string;
}

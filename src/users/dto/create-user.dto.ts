/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsBoolean, IsEmail, Matches, MaxLength, MinLength } from 'class-validator' 
export class CreateUserDto {

  @ApiProperty()
  @IsAlphanumeric()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  @MaxLength(15)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[$*&@#]).*$/, {
    message: 'Senha precisa de uma letra maiúscula, um caractere especial, pelo menos 6 caracteres e até 15 caracteres',
  })
  password:string

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}

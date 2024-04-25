import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class LoginDto{

  @ApiProperty()
  @IsString()
  @IsEmail()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
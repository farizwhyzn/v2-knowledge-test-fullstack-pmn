import { IsEmail, IsNumber, IsString } from "class-validator";
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";


export class CreateProductDto{

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  stock: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
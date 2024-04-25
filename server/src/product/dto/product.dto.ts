import { IsEmail, IsString } from "class-validator";
import { ApiProperty, OmitType } from "@nestjs/swagger";


export class CreateProductDto{

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  stock: string;
}

export class UpdateProductDto extends OmitType(CreateProductDto, ["name"] as const) {}
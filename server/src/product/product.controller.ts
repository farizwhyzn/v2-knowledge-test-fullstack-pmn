import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { ProductService } from "./product.service";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";
import { ApiBody } from "@nestjs/swagger";
import { CreateUserDto } from "../user/dto/user.dto";

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    return await this.productService.create(dto);
  }

  @Get(":id")
  async getProduct(@Param("id") id: string) {
    return await this.productService.findById(id);
  }

  @Patch(":id")
  async updateProduct(@Param("id") id: string, @Body() dto: UpdateProductDto) {
    return await this.productService.updateProduct(id, dto);
  }

  @Delete(":id")
  async deleteProduct(@Param("id") id: string) {
    return await this.productService.deleteProduct(id);
  }

}
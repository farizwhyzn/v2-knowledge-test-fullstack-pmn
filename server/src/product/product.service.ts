import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateUserDto } from "../user/dto/user.dto";
import { hash } from "bcrypt";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(dto: CreateProductDto) {
    const exist = await this.prisma.product.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (exist) throw new ConflictException("Product already exists");

    const product = await this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        stock: dto.stock,
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    return await this.prisma.product.update({
      where: {
        id: id,
      },
      data: {
        description: dto.description,
        stock: dto.stock,
      },
    });
  }

  async deleteProduct(id: string) {
    return await this.prisma.product.delete({
      where: {
        id: id,
      },
    });
  }

  async getProducts() {
    return await this.prisma.product.findMany();
  }
}
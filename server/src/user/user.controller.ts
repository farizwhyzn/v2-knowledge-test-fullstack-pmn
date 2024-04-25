import { Controller, Delete, Get, Param, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtGuard } from "../auth/guards/jwt.guard";

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get(":id")
  async getUserProfile(@Param("id") id: string) {
    return await this.userService.findById(id);
  }

  @Get()
  async getUsers() {
    return await this.userService.getAllUsers();
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    return await this.userService.deleteUser(id);
  }




}

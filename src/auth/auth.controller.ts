import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/user.dto";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { RefreshJwtGuard } from "./guards/refresh.guard";

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Post('register')
  async register(@Body() dto:CreateUserDto) {
    return await this.userService.create(dto)
  }

  @Post('login')
  async login(@Body() dto:LoginDto) {
    return await this.authService.login(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(req.user);
  }
}

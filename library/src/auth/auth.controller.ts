import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Controller("api/auth/")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("signin")
  async signin(@Request() req) {
    return this.authService.signin(req.user);
  }

  @Post("signup")
  async signup(@Body() body) {
    return this.authService.signup(body);
  }
}
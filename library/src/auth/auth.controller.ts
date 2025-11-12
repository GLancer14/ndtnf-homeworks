import { Body, Controller, Post, Request as Req, UseGuards, UsePipes } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { type Request } from "express";
import { UserValidationPipe } from "src/validation/users.pipe";
import { userSchema } from "src/validation/schemas/user.schema";
import { type UserDto } from "src/users/types/dto/user-dto.types";

@Controller("api/users")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("signin")
  async signin(@Req() req: Request) {
    console.log(req.user)
    return this.authService.signin(req.user);
  }

  @UsePipes(new UserValidationPipe(userSchema))
  @Post("signup")
  async signup(@Body() body: UserDto) {
    return this.authService.signup(body);
  }
}
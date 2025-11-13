import { Body, Controller, Post, Request as Req, UseGuards, UsePipes } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { type Request } from "express";
import { AuthService } from "./auth.service";
import { UserValidationPipe } from "src/validation/users.pipe";
import { userSchema } from "src/validation/schemas/user.schema";
import { type UserSignupDto } from "src/users/types/dto/user-dto.types";
import { UserDataForJwtPayload } from "src/users/types/users.types";

@Controller("api/users")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("signin")
  async signin(@Req() req: Request) {
    if (req.user) {
      return this.authService.signin(req.user as UserDataForJwtPayload);
    }
  }

  @UsePipes(new UserValidationPipe(userSchema))
  @Post("signup")
  async signup(@Body() body: UserSignupDto) {
    return this.authService.signup(body);
  }
}
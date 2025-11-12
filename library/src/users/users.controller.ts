import { Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Post("signin")
  async signin() {

  }

  @Post("signup")
  async signup() {

  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  signin(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
    };

    return this.jwtService.sign(payload);
  }

  async signup(user: any) {
    try {
      this.usersService.createUser(user);
      const payload = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
      };
      return this.jwtService.sign(payload);
    } catch(e) {
      throw new UnauthorizedException("Registration failed");
    }
  }
}

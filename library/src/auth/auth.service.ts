import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(id: string): Promise<any> {
    const user = await this.usersService.findUserById(id);
    if (user) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  createToken(payload: any) {
    return this.jwtService.sign(payload);
  }
}

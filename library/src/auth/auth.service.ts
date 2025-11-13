import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { UserSignupDto } from 'src/users/types/dto/user-dto.types';
import { UserDataForJwtPayload } from 'src/users/types/users.types';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<UserDataForJwtPayload | null> {
    const user = await this.usersService.findOne(email);
    if (user) {
      const passwordIsMatch = await bcrypt.compare(pass, user.password);
      if (passwordIsMatch) {
        const result = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
        };

        return result;
      }
    }

    return null;
  }

  async validateUserByJwt(id: string): Promise<UserDataForJwtPayload | null> {
    const user = await this.usersService.findById(id);
    if (user) {
      const result = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
      };

      return result;
    }

    return null;
  }

  signin(user: UserDataForJwtPayload): string {
    return this.jwtService.sign(user);
  }

  async signup(user: UserSignupDto): Promise<string> {
    const userWithHashedPass = {
      ...user,
      password: await bcrypt.hash(user.password, 10)
    };
    const newSavedUser = await this.usersService.createUser(userWithHashedPass);
    const payload = {
      id: newSavedUser._id,
      email: newSavedUser.email,
      firstName: newSavedUser.firstName,
    };

    return this.jwtService.sign(payload);
  }
}

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserDataForJwtPayload, UserJwtPayload } from "src/users/types/users.types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET ? process.env.JWT_SECRET : "",
    });
  }

  public async validate(payload: UserJwtPayload): Promise<UserDataForJwtPayload | undefined> {
    const user = await this.authService.validateUserByJwt(payload.id);
    if (!user) {
      throw new UnauthorizedException("Wrong JWT token");
    }

    return payload;
  }
}
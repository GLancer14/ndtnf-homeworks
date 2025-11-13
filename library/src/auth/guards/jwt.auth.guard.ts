import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { UserDataForJwtPayload } from "src/users/types/users.types";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = UserDataForJwtPayload>(err: any, user: TUser): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException("Wrong JWT token");
    }

    return user;
  }
}
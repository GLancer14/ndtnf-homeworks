import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import {
  catchError,
  map,
  Observable,
  of,
} from "rxjs";

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map((response) => {
          return {
            data: response,
            status: "success",
          }
        }),
        catchError(err => {
          return of({
            data: err,
            status: "fail",
          });
        })
      );
  }
}
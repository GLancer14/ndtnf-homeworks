import { BadRequestException, Injectable } from "@nestjs/common";
import {
  firstValueFrom,
  toArray,
  from,
  map,
  mergeAll,
  take,
  Observable,
  catchError,
  of,
} from "rxjs";
import axios from "axios";

@Injectable()
export class RxjsService {
  private readonly githubURL = "https://api.github.com/search/repositories?q=";
  private readonly gitLabURL = "https://gitlab.com/api/v4/projects?search=";

  private getGithub(text: string, count: number): Observable<any> {
    return from(axios.get(`${this.githubURL}${text}`))
      .pipe(
        map((res: any) => res.data.items),
        mergeAll(),
      )
      .pipe(take(count));
  }

  private getGitLab(text: string, count: number): Observable<any> {
    return from(axios.get(`${this.gitLabURL}${text}`))
      .pipe(
        map((res: any) => res.data),
        mergeAll(),
      )
      .pipe(take(count));
  }

  async searchRepositories(text: string, hub: string): Promise<any> {
    let data$: Observable<any>;

    function handleError(err: any) {
      console.log("Error: " + err);
      return of(false);
    }

    if (hub === "github") {
      data$ = this.getGithub(text, 5).pipe(
        toArray(),
        catchError(handleError),
      );
    } else if (hub === "gitlab") {
      data$ = this.getGitLab(text, 5).pipe(
        toArray(),
        catchError(handleError),
      );
    } else {
      return new BadRequestException("Unknown hub");
    }

    console.log("hub = ", hub);
    data$.subscribe(() => {});
    return await firstValueFrom(data$);
  }
}

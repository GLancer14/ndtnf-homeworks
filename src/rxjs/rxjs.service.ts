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

export enum ERepoHub {
  GITHUB = "github",
  GITLAB = "gitlab",
}

@Injectable()
export class RxjsService {
  private readonly githubURL = "https://api.github.com/search/repositories?q=";
  private readonly gitLabURL = "https://gitlab.com/api/v4/projects?search=";

  private getGithub(text: string, amount: number): Observable<any> {
    return from(axios.get(`${this.githubURL}${text}`))
      .pipe(
        map((res: any) => res.data.items),
        mergeAll(),
      )
      .pipe(take(amount));
  }

  private getGitLab(text: string, amount: number): Observable<any> {
    return from(axios.get(`${this.gitLabURL}${text}`))
      .pipe(
        map((res: any) => res.data),
        mergeAll(),
      )
      .pipe(take(amount));
  }

  async searchRepositories(text: string, hub: string, amount: number = 5): Promise<any> {
    let data$: Observable<any>;

    function handleError(err: any) {
      console.log("Error: " + err);
      return of(false);
    }

    if (hub === ERepoHub.GITHUB) {
      data$ = this.getGithub(text, amount).pipe(
        toArray(),
        catchError(handleError),
      );
    } else if (hub === ERepoHub.GITLAB) {
      data$ = this.getGitLab(text, amount).pipe(
        toArray(),
        catchError(handleError),
      );
    } else {
      return new BadRequestException("Unknown hub");
    }

    console.log("hub = ", hub);
    data$.subscribe();
    return await firstValueFrom(data$);
  }
}

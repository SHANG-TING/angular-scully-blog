import { Injectable } from '@angular/core';

import { Observable, take } from 'rxjs';

import { ScullyRoutesService } from '@scullyio/ng-lib';
import { PostsResponse } from '@web/shared/data-access/models';

@Injectable({ providedIn: 'root' })
export class PostApiService {
  constructor(private _scullyRoutesService: ScullyRoutesService) {}

  getList() {
    return this._scullyRoutesService.allRoutes$.pipe(
      take(1)
    ) as Observable<PostsResponse>;
  }
}

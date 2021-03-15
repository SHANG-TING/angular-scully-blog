import { Injectable } from '@angular/core';

import { take } from 'rxjs';

import { ScullyRoutesService } from '@scullyio/ng-lib';

@Injectable({ providedIn: 'root' })
export class PostApiService {
  constructor(private _scullyRoutesService: ScullyRoutesService) {}

  getList() {
    return this._scullyRoutesService.allRoutes$.pipe(take(1));
  }
}

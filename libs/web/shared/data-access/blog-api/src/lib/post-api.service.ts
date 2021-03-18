/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';

import { orderBy } from 'lodash-es';
import {
  from,
  map,
  Observable,
  pipe,
  take,
} from 'rxjs';
import {
  filter,
  switchMap,
  toArray,
} from 'rxjs/operators';

import { ScullyRoutesService } from '@scullyio/ng-lib';
import {
  PostInfo,
  PostsResponse,
} from '@web/shared/data-access/models';

@Injectable({ providedIn: 'root' })
export class PostApiService {
  constructor(private _scullyRoutesService: ScullyRoutesService) {}

  getList(keyword: string | null = null) {
    return this._scullyRoutesService.allRoutes$.pipe(
      take(1),
      switchMap((posts) => from(posts as PostsResponse)),
      filter((post) => post.published),
      keyword
        ? filter(
            (post) =>
              post.title.toLowerCase().includes(keyword.toLowerCase()) ||
              post.description.toLowerCase().includes(keyword.toLowerCase())
          )
        : pipe(),
      toArray(),
      map((posts) => orderBy(posts, ['createdAt'], ['desc']))
    ) as Observable<PostsResponse>;
  }

  getBySlug(slug: string) {
    return this._scullyRoutesService.allRoutes$.pipe(
      take(1),
      map((posts) => posts.find((post) => post.sourceFile === slug + '.md'))
    ) as Observable<PostInfo>;
  }
}

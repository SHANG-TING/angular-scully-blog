import { Injectable } from '@angular/core';

import { orderBy as _orderBy } from 'lodash-es';
import { from, map, Observable, pipe } from 'rxjs';
import { filter, switchMap, take, toArray } from 'rxjs/operators';

import { ScullyRoutesService } from '@scullyio/ng-lib';
import { PostInfo, PostsResponse } from '@web/shared/data-access/models';

@Injectable({ providedIn: 'root' })
export class PostApiService {
  constructor(private _scullyRoutesService: ScullyRoutesService) {}

  getList(keyword: string | null = null) {
    return this.getPublishedList().pipe(
      switchMap(from),
      keyword
        ? filter(
            (post) =>
              post.title.toLowerCase().includes(keyword.toLowerCase()) ||
              post.description.toLowerCase().includes(keyword.toLowerCase())
          )
        : pipe(),
      toArray(),
      map((posts) => _orderBy(posts, ['createdAt'], ['desc']))
    ) as Observable<PostsResponse>;
  }

  getBySlug(slug: string) {
    return this.getPublishedList().pipe(
      map((posts) => posts.find((post) => post.sourceFile === slug + '.md'))
    ) as Observable<PostInfo>;
  }

  getPublishedList() {
    const posts$ = this._scullyRoutesService
      .available$ as unknown as Observable<PostsResponse>;

    return posts$.pipe(
      take(1),
      map((posts) => posts.filter((post) => post.published))
    );
  }
}

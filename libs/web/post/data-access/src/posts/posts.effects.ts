import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostApiService } from '@web/shared/data-access/blog-api';

import { loadPosts, loadPostsFailure, loadPostsSuccess } from './posts.actions';

@Injectable()
export class PostsEffects {
  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      concatMap(({ keyword, pageIndex, pageSize }) =>
        this.postApi.getList(keyword).pipe(
          map((posts) => ({
            pageIndex,
            pageSize,
            pageCount: Math.ceil(posts.length / pageSize),
            totalCount: posts.length,
            data: posts.slice(pageSize * pageIndex, pageSize * (pageIndex + 1)),
          })),
          map((paginatedPosts) => loadPostsSuccess({ paginatedPosts })),
          catchError((error) => of(loadPostsFailure({ error })))
        )
      )
    );
  });

  constructor(
    private readonly postApi: PostApiService,
    private readonly actions$: Actions
  ) {}
}

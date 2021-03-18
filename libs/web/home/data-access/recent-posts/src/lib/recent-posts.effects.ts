import { Injectable } from '@angular/core';

import { orderBy } from 'lodash-es';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
} from 'rxjs/operators';

import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { PostApiService } from '@web/shared/data-access/blog-api';

import {
  loadRecentPosts,
  loadRecentPostsFailure,
  loadRecentPostsSuccess,
} from './recent-posts.actions';

@Injectable()
export class RecentPostsEffects {
  loadRecentPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRecentPosts),
      switchMap(() =>
        this.postApi.getList().pipe(
          map((posts) => posts.filter((post) => post.published)),
          map((posts) => orderBy(posts, ['createdAt'], ['desc'])),
          map((posts) => posts.slice(0, 5)),
          map((recentPosts) => loadRecentPostsSuccess({ recentPosts })),
          catchError((error) => of(loadRecentPostsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private readonly postApi: PostApiService,
    private readonly actions$: Actions
  ) {}
}

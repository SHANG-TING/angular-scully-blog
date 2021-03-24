import { Injectable } from '@angular/core';

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
import { TagApiService } from '@web/shared/data-access/blog-api';

import {
  loadTags,
  loadTagsFailure,
  loadTagsSuccess,
} from './tags.actions';

@Injectable()
export class TagsEffects {
  loadTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTags),
      switchMap(() =>
        this.tagApi.getList().pipe(
          map((tags) => loadTagsSuccess({ tags })),
          catchError((error) => of(loadTagsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private tagApi: TagApiService
  ) {}
}

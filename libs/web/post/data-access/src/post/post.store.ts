import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import {
  filter,
  pluck,
  switchMap,
  tap,
} from 'rxjs/operators';

import {
  ComponentStore,
  tapResponse,
} from '@ngrx/component-store';
import { PostApiService } from '@web/shared/data-access/blog-api';
import {
  GenericState,
  PostInfo,
} from '@web/shared/data-access/models';

interface PostState extends GenericState<PostInfo> {
  slug: string;
}

@Injectable()
export class PostStore extends ComponentStore<PostState> {
  slugParams$: Observable<string> = this.route.params.pipe(
    pluck('slug'),
    filter((slug: string) => !!slug)
  );

  post$ = this.slugParams$.pipe(
    tap((slug) => {
      this.patchState({
        slug,
      });
      this.loadPost({ slug });
    }),
    switchMap(() => this.select((s) => s.data))
  );

  loadPost = this.effect<{ slug: string }>((params$) =>
    params$.pipe(
      tap(() => {
        this.patchState({
          status: 'loading',
          error: null,
        });
      }),
      switchMap(({ slug }) =>
        this.postApi.getBySlug(slug).pipe(
          tapResponse(
            (post) => {
              this.patchState({
                data: post,
                status: 'success',
                error: '',
              });
            },
            (error: any) => {
              this.patchState({
                status: 'error',
                error,
              });
            }
          )
        )
      )
    )
  );

  constructor(private postApi: PostApiService, private route: ActivatedRoute) {
    super(<PostState>{});
  }
}

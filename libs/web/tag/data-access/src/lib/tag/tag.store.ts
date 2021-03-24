import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, map, pluck, switchMap, tap } from 'rxjs/operators';

import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { TagApiService } from '@web/shared/data-access/blog-api';
import {
  GenericState,
  PaginatedList,
  PostInfo,
  TagInfo,
} from '@web/shared/data-access/models';

type TagState = GenericState<
  Pick<TagInfo, 'name'> & { posts: PaginatedList<PostInfo> }
>;
type LoadPostsPrams = {
  keyword: string | null;
  pageIndex: number;
  pageSize: number;
};

@Injectable()
export class TagStore extends ComponentStore<TagState> {
  tagNameParams$: Observable<string> = this.route.params.pipe(
    pluck('tagName'),
    filter((tagName: string) => !!tagName)
  );
  paginatedPosts$ = this.select((s) => s.data?.posts);

  loadPosts = this.effect<LoadPostsPrams>((params$) =>
    params$.pipe(
      tap(() => {
        this.patchState({
          status: 'loading',
          error: null,
        });
      }),
      switchMap((params) =>
        this.tagNameParams$.pipe(map((tagName) => ({ ...params, tagName })))
      ),
      switchMap(({ keyword, pageIndex, pageSize, tagName }) =>
        this.tagApi.getPostList(tagName, keyword).pipe(
          map((posts) => ({
            pageIndex,
            pageSize,
            pageCount: Math.ceil(posts.length / pageSize),
            totalCount: posts.length,
            data: posts.slice(pageSize * pageIndex, pageSize * (pageIndex + 1)),
          })),
          tapResponse(
            (posts) => {
              this.patchState({
                data: {
                  name: tagName,
                  posts,
                },
                status: 'success',
                error: '',
              });
            },
            (error) => {
              this.patchState({
                status: 'error',
                error: error as unknown as string,
              });
            }
          )
        )
      )
    )
  );

  constructor(private tagApi: TagApiService, private route: ActivatedRoute) {
    super(<TagState>{});
  }
}

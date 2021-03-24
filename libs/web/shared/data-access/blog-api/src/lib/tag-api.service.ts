import { Injectable } from '@angular/core';

import { orderBy as _orderBy } from 'lodash-es';
import {
  from,
  Observable,
  pipe,
} from 'rxjs';
import {
  filter,
  map,
  switchMap,
  toArray,
} from 'rxjs/operators';

import {
  PostsResponse,
  TagInfo,
  TagsResponse,
} from '@web/shared/data-access/models';

import { PostApiService } from './post-api.service';

@Injectable({ providedIn: 'root' })
export class TagApiService {
  constructor(private postApi: PostApiService) {}

  getList(): Observable<TagsResponse> {
    return this.postApi.getPublishedList().pipe(
      map((posts) => {
        const tagMap = {} as Record<string, TagInfo>;

        for (const post of posts) {
          for (const tagName of post.tags) {
            if (!tagMap[tagName]) {
              tagMap[tagName] = {
                name: tagName,
                count: 1,
              };
              continue;
            }
            tagMap[tagName].count++;
          }
        }

        return Object.values(tagMap);
      }),
      map((posts) => _orderBy(posts, ['count'], ['desc']))
    );
  }

  getPostList(tagName: string, keyword: string | null = null) {
    return this.postApi.getPublishedList().pipe(
      switchMap(from),
      filter((post) => post.tags.includes(tagName)),
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
}

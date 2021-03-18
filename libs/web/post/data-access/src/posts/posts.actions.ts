import {
  createAction,
  props,
} from '@ngrx/store';
import {
  PaginatedList,
  PostInfo,
} from '@web/shared/data-access/models';

export const loadPosts = createAction(
  '[Posts Page/API] Init',
  props<{
    keyword: string;
    pageIndex: number;
    pageSize: number;
  }>()
);

export const loadPostsSuccess = createAction(
  '[Posts Page/API] Load Posts Success',
  props<{
    paginatedPosts: PaginatedList<PostInfo>;
  }>()
);

export const loadPostsFailure = createAction(
  '[Posts Page/API] Load Posts Failure',
  props<{ error: any }>()
);

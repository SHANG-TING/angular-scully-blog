import { createAction, props } from '@ngrx/store';
import { PostInfo } from '@web/shared/data-access/models';

export const loadRecentPosts = createAction('[RecentPosts Page] Init');

export const loadRecentPostsSuccess = createAction(
  '[RecentPosts/API] Load RecentPosts Success',
  props<{ recentPosts: PostInfo[] }>()
);

export const loadRecentPostsFailure = createAction(
  '[RecentPosts/API] Load RecentPosts Failure',
  props<{ error: any }>()
);

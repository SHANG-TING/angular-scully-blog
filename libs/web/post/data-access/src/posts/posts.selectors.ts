import { createFeatureSelector, createSelector } from '@ngrx/store';
import { postsFeatureKey, PostsState } from './posts.reducer';

export const selectPostState =
  createFeatureSelector<PostsState>(postsFeatureKey);

export const selectPaginatedPosts = createSelector(
  selectPostState,
  (state: PostsState) => state.data
);

import { createReducer, on } from '@ngrx/store';
import { GenericState, PaginatedList, PostInfo } from '@web/shared/data-access/models';

import { loadPosts, loadPostsFailure, loadPostsSuccess } from './posts.actions';

export const postsFeatureKey = 'posts';

export type PostsState = GenericState<PaginatedList<PostInfo>>;

export const initialState: PostsState = {
  data: null,
  error: null,
  status: 'pending',
};

export const postsReducer = createReducer(
  initialState,
  on(loadPosts, (state) => ({
    ...state,
    status: 'loading',
    error: null,
  })),
  on(loadPostsSuccess, (state, { paginatedPosts }) => ({
    ...state,
    data: paginatedPosts,
    status: 'success',
    error: null,
  })),
  on(loadPostsFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error,
  }))
);

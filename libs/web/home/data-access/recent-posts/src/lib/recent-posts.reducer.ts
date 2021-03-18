import { createReducer, on } from '@ngrx/store';
import { GenericState, PostsResponse } from '@web/shared/data-access/models';

import {
  loadRecentPosts,
  loadRecentPostsFailure,
  loadRecentPostsSuccess,
} from './recent-posts.actions';

export type RecentPostsState = GenericState<PostsResponse>;

const initialState: RecentPostsState = {
  data: null,
  status: 'pending',
  error: null,
};

export const recentPostsFeatureKey = 'recentPosts';

export const recentPostsReducer = createReducer(
  initialState,
  on(loadRecentPosts, (state) => ({ ...state, status: 'loading' })),
  on(loadRecentPostsSuccess, (state, { recentPosts }) => ({
    ...state,
    data: recentPosts,
    status: 'success',
    error: null,
  })),
  on(loadRecentPostsFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error',
  }))
);

import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import {
  recentPostsFeatureKey,
  RecentPostsState,
} from './recent-posts.reducer';

export const getRecentPostsState = createFeatureSelector<RecentPostsState>(
  recentPostsFeatureKey
);

export const getRecentPosts = createSelector(
  getRecentPostsState,
  ({ data }) => data
);

import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import {
  tagsFeatureKey,
  TagsState,
} from './tags.reducer';

export const selectTagsState = createFeatureSelector<TagsState>(tagsFeatureKey);

export const selectTagsData = createSelector(
  selectTagsState,
  (state) => state.data
);

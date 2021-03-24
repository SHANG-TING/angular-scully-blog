import {
  createReducer,
  on,
} from '@ngrx/store';
import {
  GenericState,
  TagsResponse,
} from '@web/shared/data-access/models';

import {
  loadTags,
  loadTagsFailure,
  loadTagsSuccess,
} from './tags.actions';

export const tagsFeatureKey = 'tags';

export type TagsState = GenericState<TagsResponse>;

export const initialState: TagsState = {
  data: null,
  status: 'pending',
  error: null,
};

export const tagsReducer = createReducer(
  initialState,
  on(loadTags, (state) => ({
    ...state,
    status: 'loading',
    error: null,
  })),
  on(loadTagsSuccess, (state, { tags }) => ({
    ...state,
    data: tags,
    status: 'success',
    error: null,
  })),
  on(loadTagsFailure, (state, {error}) => ({
    ...state,
    status: 'error',
    error,
  }))
);

import {
  createAction,
  props,
} from '@ngrx/store';
import { TagsResponse } from '@web/shared/data-access/models';

export const loadTags = createAction('[Tags Page/API] Init');

export const loadTagsSuccess = createAction(
  '[Tags Page/API] Load Tags Success',
  props<{
    tags: TagsResponse;
  }>()
);

export const loadTagsFailure = createAction(
  '[Tags Page/API] Load Tags Failure',
  props<{ error: any }>()
);

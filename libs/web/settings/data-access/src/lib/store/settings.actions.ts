import { createAction, props } from '@ngrx/store';

export const actionSettingsChangeTheme = createAction(
  '[Settings] Change Theme',
  props<{ theme: 'light' | 'dark' }>()
);

export const actionSettingsChangeStickyHeader = createAction(
  '[Settings] Change Sticky Header',
  props<{ stickyHeader: boolean }>()
);

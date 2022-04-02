import { createAction, props } from '@ngrx/store';
import { SettingsState } from './settings.reducer';

export const actionSettingsChangeTheme = createAction(
  '[Settings] Change Theme',
  props<Pick<SettingsState, 'theme'>>()
);

export const actionSettingsChangeStickyHeader = createAction(
  '[Settings] Change Sticky Header',
  props<Pick<SettingsState, 'stickyHeader'>>()
);

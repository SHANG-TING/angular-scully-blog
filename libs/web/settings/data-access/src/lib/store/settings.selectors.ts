import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsState, settingsFeatureKey } from './settings.reducer';

export const selectSettingsState =
  createFeatureSelector<SettingsState>(settingsFeatureKey);

export const selectSettingsStickyHeader = createSelector(
  selectSettingsState,
  (state) => state.stickyHeader
);

export const selectEffectiveTheme = createSelector(
  selectSettingsState,
  (state) => state.theme
);

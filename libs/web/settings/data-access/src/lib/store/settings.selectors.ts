import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsState, settingsFeatureKey } from './settings.reducer';

export const selectSettings = createFeatureSelector<SettingsState>(settingsFeatureKey);

export const selectSettingsStickyHeader = createSelector(
  selectSettings,
  (state) => state.stickyHeader
);

export const selectEffectiveTheme = createSelector(selectSettings, (state) => state.theme);

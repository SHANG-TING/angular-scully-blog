import { createReducer, on } from '@ngrx/store';

import { actionSettingsChangeStickyHeader, actionSettingsChangeTheme } from './settings.actions';

export const settingsFeatureKey = 'settings';

export interface SettingsState {
  theme: 'light' | 'dark';
  stickyHeader: 'auto' | 'always' | 'never';
}

export const initialState: SettingsState = {
  theme: 'dark',
  stickyHeader: 'auto',
};

// Detect if prefers-color-scheme is supported
if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
  // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise, set it to Light.
  initialState.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const settingsReducer = createReducer(
  initialState,
  on(actionSettingsChangeTheme, actionSettingsChangeStickyHeader, (state, action) => ({
    ...state,
    ...action,
  }))
);

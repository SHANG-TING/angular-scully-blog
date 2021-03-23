import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

import { LocalStorageService } from '../services/local-storage.service';
import { settingsFeatureKey, SettingsState } from '../store/settings.reducer';

interface AppState {
  [settingsFeatureKey]: SettingsState;
}

export function initStateFromLocalStorage(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function (state, action) {
    const newState = reducer(state, action);

    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      return { ...newState, ...LocalStorageService.loadInitialState() };
    }

    return newState;
  };
}

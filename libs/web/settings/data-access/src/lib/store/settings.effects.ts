import { Injectable } from '@angular/core';

import { merge } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { INIT, select, Store } from '@ngrx/store';

import { LocalStorageService } from '../services/local-storage.service';
import { actionSettingsChangeStickyHeader, actionSettingsChangeTheme } from './settings.actions';
import { SettingsState } from './settings.reducer';
import { selectEffectiveTheme, selectSettings } from './settings.selectors';

const SETTINGS_KEY = 'SETTINGS';

@Injectable({
  providedIn: 'root',
})
export class SettingEffects {
  persistSettings$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionSettingsChangeTheme, actionSettingsChangeStickyHeader),
        withLatestFrom(this.store.pipe(select(selectSettings))),
        tap(([, settings]) => this.localStorageService.setItem(SETTINGS_KEY, settings))
      ),
    { dispatch: false }
  );

  updateTheme$ = createEffect(
    () =>
      merge(INIT, this.actions$.pipe(ofType(actionSettingsChangeTheme))).pipe(
        withLatestFrom(this.store.pipe(select(selectEffectiveTheme))),
        tap(([, effectiveTheme]) => {
          const containerElm = document.body.parentElement;
          if (effectiveTheme === 'dark') {
            containerElm?.classList.add('dark');
            containerElm?.style.setProperty('color-scheme', 'dark');
          } else {
            containerElm?.classList.remove('dark');
            containerElm?.style.removeProperty('color-scheme');
          }
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<SettingsState>,
    private localStorageService: LocalStorageService
  ) {}
}

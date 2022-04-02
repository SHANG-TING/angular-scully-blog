import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import { Store } from '@ngrx/store';
import {
  actionSettingsChangeStickyHeader,
  actionSettingsChangeTheme,
  selectSettings,
} from '@web/settings/data-access';

@Component({
  selector: 'asb-settings',
  templateUrl: './settings.component.html',
  styles: [],
})
export class SettingsComponent {
  settings$ = this.store.select(selectSettings);

  stickyHeaderModes = [
    { value: 'auto', label: '自動固定 (ScrollBar)' },
    { value: 'always', label: '總是固定' },
    { value: 'never', label: '永不固定' },
  ];

  themes = [
    { value: 'light', label: '預設主題' },
    { value: 'dark', label: '深色主題' },
  ];

  constructor(private store: Store) {}

  onStickyHeaderToggle(event: MatSelectChange) {
    this.store.dispatch(actionSettingsChangeStickyHeader({ stickyHeader: event.value }));
  }

  onThemeSelect(event: MatSelectChange) {
    this.store.dispatch(actionSettingsChangeTheme({ theme: event.value }));
  }
}

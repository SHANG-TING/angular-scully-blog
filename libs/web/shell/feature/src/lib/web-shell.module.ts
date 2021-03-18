import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { IconModule } from '@web/shared/ui/icon';
import { WebLayoutModule } from '@web/shell/ui/layout';

import { webShellRoutes } from './web-shell.routes';

const rootReducers = {};

@NgModule({
  imports: [
    CommonModule,
    WebLayoutModule,
    IconModule,
    RouterModule.forRoot(webShellRoutes, {
      scrollPositionRestoration: 'enabled',
    }),
    StoreModule.forRoot(rootReducers),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    ScullyLibModule,
  ],
  exports: [RouterModule, ScullyLibModule],
})
export class WebShellModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ScullyLibModule } from '@scullyio/ng-lib';
import { IconModule } from '@web/shared/ui/icon';
import { WebLayoutModule } from '@web/shell/ui/layout';

import { webShellRoutes } from './web-shell.routes';

@NgModule({
  imports: [
    CommonModule,
    WebLayoutModule,
    IconModule,
    RouterModule.forRoot(webShellRoutes, {
      scrollPositionRestoration: 'enabled',
    }),
    ScullyLibModule
  ],
  exports: [
    RouterModule,
    ScullyLibModule
  ],
})
export class WebShellModule {}

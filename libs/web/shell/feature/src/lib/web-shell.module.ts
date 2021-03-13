import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WebLayoutModule } from '@web/shell/ui/layout';

import { webShellRoutes } from './web-shell.routes';

@NgModule({
  imports: [
    CommonModule,
    WebLayoutModule,
    RouterModule.forRoot(webShellRoutes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class WebShellModule {}

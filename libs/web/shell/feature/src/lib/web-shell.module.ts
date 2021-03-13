import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  Route,
  RouterModule,
} from '@angular/router';

export const webShellRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(webShellRoutes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class WebShellModule {}

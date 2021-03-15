import { Route } from '@angular/router';

import { LayoutComponent } from '@web/shell/ui/layout';

export const webShellRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@web/home/feature').then((m) => m.HomeModule),
      },
      {
        path: 'posts',
        loadChildren: () =>
          import('@web/post/feature/shell').then((m) => m.PostShellModule),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

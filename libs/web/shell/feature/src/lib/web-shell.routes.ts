import { Route } from '@angular/router';

import { LayoutComponent } from '@web/shell/ui/layout';

export const webShellRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: async () =>
          (await import('@web/home/feature')).HomeModule,
      },
      {
        path: 'posts',
        loadChildren: async () =>
          (await import('@web/post/feature/shell')).PostShellModule,
      },
      {
        path: 'tags',
        loadChildren: async () =>
          (await import('@web/tag/feature/shell')).TagShellModule,
      },
      {
        path: 'about',
        loadChildren: async () =>
          (await import('@web/about/feature')).AboutModule,
      },
      {
        path: 'projects',
        loadChildren: async () =>
          (await import('@web/projects/feature')).ProjectsModule,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

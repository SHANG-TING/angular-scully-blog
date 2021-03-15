import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('@web/post/feature/list').then((m) => m.PostsModule),
      },
      {
        path: ':slug',
        loadChildren: () =>
          import('@web/post/feature/detail').then((m) => m.PostModule),
      },
    ]),
  ],
})
export class PostShellModule {}

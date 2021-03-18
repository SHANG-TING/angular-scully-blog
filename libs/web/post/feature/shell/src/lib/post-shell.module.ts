import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  PostsEffects,
  postsFeatureKey,
  postsReducer,
} from '@web/post/data-access';

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
    StoreModule.forFeature(postsFeatureKey, postsReducer),
    EffectsModule.forFeature([PostsEffects])
  ],
})
export class PostShellModule {}

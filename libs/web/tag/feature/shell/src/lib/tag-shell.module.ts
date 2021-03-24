import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  TagsEffects,
  tagsFeatureKey,
  tagsReducer,
} from '@web/tag/data-access';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('@web/tag/feature/list').then((m) => m.TagsModule),
      },
      {
        path: ':tagName',
        loadChildren: () =>
          import('@web/tag/feature/detail').then((m) => m.TagModule),
      },
    ]),
    StoreModule.forFeature(tagsFeatureKey, tagsReducer),
    EffectsModule.forFeature([TagsEffects])
  ],
})
export class TagShellModule {}



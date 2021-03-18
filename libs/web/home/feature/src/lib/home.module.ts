import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  RecentPostsEffects,
  recentPostsFeatureKey,
  recentPostsReducer,
} from '@web/home/data-access/recent-posts';
import { RecentPostsModule } from '@web/home/ui/recent-posts';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
    StoreModule.forFeature(recentPostsFeatureKey, recentPostsReducer),
    EffectsModule.forFeature([RecentPostsEffects]),
    RecentPostsModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ScullyLibModule } from '@scullyio/ng-lib';

import { PostComponent } from './post.component';

@NgModule({
  imports: [
    CommonModule,
    ScullyLibModule,
    RouterModule.forChild([{ path: '', component: PostComponent }]),
  ],
  declarations: [PostComponent],
})
export class PostModule {}

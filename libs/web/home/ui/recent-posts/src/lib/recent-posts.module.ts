import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecentPostsComponent } from './recent-posts.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [RecentPostsComponent],
  declarations: [RecentPostsComponent],
  providers: [],
})
export class RecentPostsModule {}

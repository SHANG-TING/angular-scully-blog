import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecentPostsComponent } from './recent-posts.component';

@NgModule({
  imports: [CommonModule],
  exports: [RecentPostsComponent],
  declarations: [RecentPostsComponent],
  providers: [],
})
export class RecentPostsModule {}

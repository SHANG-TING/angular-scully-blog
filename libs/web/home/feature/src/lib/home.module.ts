import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
    RecentPostsModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}

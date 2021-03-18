import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PostsComponent } from './posts.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: PostsComponent },
    ]),
  ],
  declarations: [PostsComponent],
})
export class PostsModule {}

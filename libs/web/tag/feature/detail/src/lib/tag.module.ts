import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TagComponent } from './tag.component';

@NgModule({
  declarations: [TagComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: TagComponent,
      },
    ]),
  ],
})
export class TagModule {}

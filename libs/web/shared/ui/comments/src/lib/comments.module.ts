import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UtterancesComponent } from './utterances.component';

@NgModule({
  declarations: [UtterancesComponent],
  imports: [CommonModule],
  exports: [UtterancesComponent],
})
export class CommentsModule {}

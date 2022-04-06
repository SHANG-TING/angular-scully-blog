import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PortraitBackdropModule } from '@web/shared/ui/portrait-backdrop';

import { SummaryComponent } from './summary.component';

@NgModule({
  declarations: [SummaryComponent],
  exports: [SummaryComponent],
  imports: [CommonModule, RouterModule, PortraitBackdropModule],
})
export class SummaryModule {}

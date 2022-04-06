import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ResizeObserverModule } from '@ng-web-apis/resize-observer';

import { PortraitBackdropComponent } from './portrait-backdrop.component';

@NgModule({
  declarations: [PortraitBackdropComponent],
  exports: [PortraitBackdropComponent],
  imports: [CommonModule, ResizeObserverModule],
})
export class PortraitBackdropModule {}

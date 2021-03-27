import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SvgIconsModule } from '@ngneat/svg-icon';

import { FooterComponent } from './footer.component';

@NgModule({
  imports: [CommonModule, SvgIconsModule],
  declarations: [FooterComponent],
  exports: [FooterComponent],
})
export class FooterModule {}

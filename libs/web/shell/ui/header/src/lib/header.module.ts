import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SvgIconsModule } from '@ngneat/svg-icon';

import { HeaderComponent } from './header.component';

@NgModule({
  imports: [CommonModule, RouterModule, SvgIconsModule],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {}

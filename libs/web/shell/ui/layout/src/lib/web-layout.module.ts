import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterModule } from '@web/shell/ui/footer';
import { HeaderModule } from '@web/shell/ui/header';

import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [CommonModule, RouterModule, HeaderModule, FooterModule],
  declarations: [LayoutComponent],
})
export class WebLayoutModule {}

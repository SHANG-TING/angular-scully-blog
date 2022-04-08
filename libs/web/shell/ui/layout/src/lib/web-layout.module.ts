import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterModule } from '@web/shell/ui/footer';
import { HeaderModule } from '@web/shell/ui/header';
import { ScrollToTopBtnModule } from '@web/shell/ui/scroll-to-top-btn';
import { SummaryModule } from '@web/shell/ui/summary';

import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    SummaryModule,
    FooterModule,
    ScrollToTopBtnModule,
  ],
  declarations: [LayoutComponent],
})
export class WebLayoutModule {}

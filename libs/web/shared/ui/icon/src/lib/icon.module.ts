import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SvgIconsModule } from '@ngneat/svg-icon';

import { asbLogoIcon } from './svg/logo';

@NgModule({
  imports: [
    CommonModule,
    SvgIconsModule.forRoot({
      icons: [asbLogoIcon],
    }),
  ],
  exports: [SvgIconsModule]
})
export class IconModule {}

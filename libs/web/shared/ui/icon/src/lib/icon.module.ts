import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SvgIconsModule } from '@ngneat/svg-icon';

import { asbBarIcon } from './svg/bar';
import { asbLogoIcon } from './svg/logo';
import { asbMoonIcon } from './svg/moon';
import { asbSunIcon } from './svg/sun';
import { asbTimesIcon } from './svg/times';

@NgModule({
  imports: [
    CommonModule,
    SvgIconsModule.forRoot({
      icons: [asbLogoIcon, asbBarIcon, asbTimesIcon, asbSunIcon, asbMoonIcon],
    }),
  ],
  exports: [SvgIconsModule]
})
export class IconModule {}

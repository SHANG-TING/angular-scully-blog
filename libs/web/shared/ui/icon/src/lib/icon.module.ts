import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SvgIconsModule } from '@ngneat/svg-icon';

import { asbBarIcon } from './svg/bars';
import { asbColorIcon } from './svg/color';
import { asbFacebookIcon } from './svg/facebook';
import { asbGithubIcon } from './svg/github';
import { asbLinkedinIcon } from './svg/linkedin';
import { asbLogoIcon } from './svg/logo';
import { asbMailIcon } from './svg/mail';
import { asbMoonIcon } from './svg/moon';
import { asbSettingsIcon } from './svg/settings';
import { asbSunIcon } from './svg/sun';
import { asbTimesIcon } from './svg/times';
import { asbTwitterIcon } from './svg/twitter';

@NgModule({
  imports: [
    CommonModule,
    SvgIconsModule.forRoot({
      icons: [
        asbBarIcon,
        asbColorIcon,
        asbFacebookIcon,
        asbGithubIcon,
        asbLinkedinIcon,
        asbLogoIcon,
        asbMailIcon,
        asbMoonIcon,
        asbSettingsIcon,
        asbSunIcon,
        asbTimesIcon,
        asbTwitterIcon,
      ],
    }),
  ],
  exports: [SvgIconsModule],
})
export class IconModule {}

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';

import { SvgIconsModule } from '@ngneat/svg-icon';
import { SettingsComponent } from './settings.component';

const MAT_COMPONENTS = [MatSelectModule, MatSlideToggleModule];

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: SettingsComponent,
      },
    ]),
    MAT_COMPONENTS,
    SvgIconsModule,
  ],
})
export class SettingsModule {}

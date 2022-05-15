import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { ActionComponent } from './action.component';

import { HLSTextModule } from '@shared/components/text/text.module';

@NgModule({
  declarations: [ActionComponent],
  imports: [CommonModule, AngularSvgIconModule, HLSTextModule],
  exports: [ActionComponent],
})
export class HLSActionModule {}

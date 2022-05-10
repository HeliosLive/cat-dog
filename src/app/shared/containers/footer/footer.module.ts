import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, AngularSvgIconModule],
  exports: [FooterComponent],
})
export class HLSFooterModule {}

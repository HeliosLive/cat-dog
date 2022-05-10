import { NgModule } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [AngularSvgIconModule],
  exports: [HeaderComponent],
})
export class HLSHeaderModule {}

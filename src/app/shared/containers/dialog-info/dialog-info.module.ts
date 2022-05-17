import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { DialogInfoComponent } from './dialog-info.component';

import { HLSTextModule } from '@shared/components/text/text.module';

@NgModule({
  declarations: [DialogInfoComponent],
  imports: [CommonModule, AngularSvgIconModule, HLSTextModule],
  exports: [DialogInfoComponent],
})
export class HLSDialogInfoModule {}

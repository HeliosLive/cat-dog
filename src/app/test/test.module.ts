import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { HLSTextModule } from '@shared/components/text/text.module';
import { HLSButtonModule } from '@shared/components/button/button.module';
import { HLSRippleDirectiveModule } from '@shared/directives/ripple/ripple.directive.module';

@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    TestRoutingModule,
    AngularSvgIconModule,
    HLSTextModule,
    HLSButtonModule,
    HLSRippleDirectiveModule,
  ],
  exports: [TestComponent],
})
export class TestModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { HLSTextModule } from '@shared/components/text/text.module';
import { HLSButtonModule } from '@shared/components/button/button.module';
import { HLSRippleDirectiveModule } from '@shared/directives/ripple/ripple.directive.module';
import { HLSLottieAnimationModule } from '@shared/components/lottie-animation/lottie-animation.module';
import { HLSArticleModule } from '@shared/containers/article/article.module';

@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    TestRoutingModule,
    AngularSvgIconModule,
    HLSArticleModule,
    HLSTextModule,
    HLSButtonModule,
    HLSLottieAnimationModule,
    HLSRippleDirectiveModule,
  ],
  exports: [TestComponent],
})
export class TestModule {}

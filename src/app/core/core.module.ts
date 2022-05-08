import { NgModule } from '@angular/core';

import { SvgRegisterModule } from './svg-register/svg-register.module';
import { LottieAnimationModule } from './lottie-animation/lottie-animation.module';

@NgModule({
  imports: [SvgRegisterModule, LottieAnimationModule],
})
export class CoreModule {}

import { NgModule } from '@angular/core';
import { HLSRippleDirectiveModule } from '@shared/directives/ripple/ripple.directive.module';
import { HLSTextModule } from '../text/text.module';

import { ButtonComponent } from './button.component';

@NgModule({
  declarations: [ButtonComponent],
  imports: [HLSRippleDirectiveModule, HLSTextModule],
  exports: [ButtonComponent],
})
export class HLSButtonModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';

import { HLSTextModule } from '@shared/components/text/text.module';

@NgModule({
  declarations: [TestComponent],
  imports: [CommonModule, TestRoutingModule, HLSTextModule],
  exports: [TestComponent],
})
export class TestModule {}

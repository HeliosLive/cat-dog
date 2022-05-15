import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule } from '@angular/cdk/overlay';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { ArticleComponent } from './article.component';

import { HLSActionModule } from './action/action.module';
import { HLSTextModule } from '@shared/components/text/text.module';
import { HlsTimeAgoPipeModule } from '@shared/pipes/time-ago.pipe.module';
import { HLSTooltipDirectiveModule } from '@shared/directives/tooltip/tooltip.directive.module';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    OverlayModule,
    AngularSvgIconModule,
    HLSActionModule,
    HLSTextModule,
    HLSTooltipDirectiveModule,
    HlsTimeAgoPipeModule,
  ],
  exports: [ArticleComponent],
})
export class HLSArticleModule {}

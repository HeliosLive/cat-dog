import { NgModule } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { ArticleComponent } from './article.component';

import { HLSTextModule } from '@shared/components/text/text.module';
import { HlsTimeAgoPipeModule } from '@shared/pipes/time-ago.pipe.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    AngularSvgIconModule,
    HLSTextModule,
    HlsTimeAgoPipeModule,
  ],
  exports: [ArticleComponent],
})
export class HLSArticleModule {}

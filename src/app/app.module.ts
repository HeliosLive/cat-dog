import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { OverlayModule } from '@angular/cdk/overlay';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from '@core/core.module';
import { ConfigModule } from '@config/config.module';
import { HLSHeaderModule } from '@shared/containers/header/header.module';
import { HLSFooterModule } from '@shared/containers/footer/footer.module';
import { HLSDialogInfoModule } from '@shared/containers/dialog-info/dialog-info.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OverlayModule,
    CoreModule,
    ConfigModule,
    HLSHeaderModule,
    HLSFooterModule,
    HLSDialogInfoModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

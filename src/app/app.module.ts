import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from '@core/core.module';
import { HLSHeaderModule } from '@shared/containers/header/header.module';
import { HLSFooterModule } from '@shared/containers/footer/footer.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    HLSHeaderModule,
    HLSFooterModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

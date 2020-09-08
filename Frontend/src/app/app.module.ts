import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {DeviceIdInterceptor} from './device-id.interceptor'
import {DeviceService} from './device.service'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DeviceService, {provide: HTTP_INTERCEPTORS, useClass:DeviceIdInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

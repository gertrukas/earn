import { LOCALE_ID, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { HttpClientModule } from "@angular/common/http";

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    NgxGoogleAnalyticsModule.forRoot('G-R2YV2SJ8RJ'),
    NgxGoogleAnalyticsRouterModule


  ],

  providers: [{
    provide: LOCALE_ID, useValue: 'es'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

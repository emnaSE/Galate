/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthModule} from "./pages/auth/auth.module";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AlertsModule } from 'angular-alert-module';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AlertsModule.forRoot(),
    ModalModule.forRoot(),
  
  ],
    
  bootstrap: [AppComponent ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
   
  ],
})
export class AppModule {
}

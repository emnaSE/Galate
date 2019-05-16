import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TooltipModule} from "ngx-bootstrap";
import { StarterComponent } from './starter/starter.component';
import { StarterHeaderComponent } from './starter/starter-header/starter-header.component';
import { StarterFooterComponent } from './starter/starter-footer/starter-footer.component';
import { TestComponent } from './pages/test/test.component';
import { ResultTableComponent } from './pages/resultTable/resultTable.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { StartTestComponent } from './pages/startTest/startTest.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './pages/login/login.service';
import { RegisterService } from './pages/register/register.service';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';

import { TestService } from './pages/test/test.service';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';


@NgModule({
  declarations: [
    AppComponent,
    ResultTableComponent,
    TestComponent,
    StartTestComponent,
    LoginComponent,
    RegisterComponent,
    StarterComponent,
    StarterHeaderComponent,
    StarterFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    HttpClientModule,
    TooltipModule.forRoot()
  ],

  providers: [RegisterService, LoginService, TestService],


  bootstrap: [AppComponent]
})
export class AppModule { }

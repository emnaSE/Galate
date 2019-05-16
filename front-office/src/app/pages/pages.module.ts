import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TestModule } from './test/test.module';
import { ResultTableModule } from './resultTable/resultTable.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from "./register/RegisterModule";
import { StartTestModule } from './startTest/startTest.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    ResultTableModule,
    TestModule,
    LoginModule,
    RegisterModule,
    StartTestModule,
   
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}

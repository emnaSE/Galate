import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TestModule } from './test/test.module';
import { ResultTableModule } from './resultTable/resultTable.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from "./register/RegisterModule";
import { StartTestModule } from './startTest/startTest.module';
import { DownloadModule } from './downloadPDF/download.module';
import { TestAnnuleComponent } from './testAnnule/testAnnule.component';
import { TestAnnuleModule } from './testAnnule/testAnnule.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    ResultTableModule,
    DownloadModule,
    TestModule,
    LoginModule,
    RegisterModule,
    StartTestModule,
    TestAnnuleModule,
    
   
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}

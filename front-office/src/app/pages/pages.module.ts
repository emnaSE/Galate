import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeModule } from './home/home.module';
import { TestModule } from './test/test.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    HomeModule,
    TestModule,
   
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}

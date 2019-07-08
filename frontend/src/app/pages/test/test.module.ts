import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { TestComponent } from './test.component';
import { FormsModule } from '@angular/forms';
import { CreateTestComponent } from './create-test/create-test.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AffectCategorieComponent } from './affect-categorie/affect-categorie.component';
import { AffectSubcategorieComponent } from './affect-subcategorie/affect-subcategorie.component';
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import {BsDatepickerModule} from "ngx-bootstrap";
import {TestRoutingModule} from "./test-routing.module";
import { TestOrderComponent } from './test-order/test-order.component';
import { AddOrderComponent } from './test-order/add-order/add-order.component';
import {Ng2SmartTableModule} from "ng2-smart-table";
import { DuplicationComponent } from './duplication/duplication.component';

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


import { AlertsModule } from 'angular-alert-module';
import {TranslateModule} from "@ngx-translate/core";



const components = [
  TestComponent,
  AffectCategorieComponent,
  AffectSubcategorieComponent,
  CreateTestComponent,
];
@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    TestRoutingModule,
    NgxPaginationModule,
    TranslateModule,
    AngularMultiSelectModule,
    Ng2SmartTableModule,
    NgbModule,
     BsDatepickerModule.forRoot(),
    AlertsModule.forRoot(),
  ],
  declarations: [
    ...components,
    TestOrderComponent,
    AddOrderComponent,
    DuplicationComponent,
  ],
})
export class TestModule { }

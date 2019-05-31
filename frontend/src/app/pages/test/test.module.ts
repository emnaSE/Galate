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
    AngularMultiSelectModule,

    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    ...components,
  ],
})
export class TestModule { }

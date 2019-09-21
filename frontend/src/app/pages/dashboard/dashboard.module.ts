import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import {Ng2SmartTableModule} from "ng2-smart-table";
import {NgxPaginationModule} from "ngx-pagination";
import {CreateCategorieComponent} from "./create-categorie/create-categorie.component";
import {FormsModule} from "@angular/forms";
import {InfoCategorieComponent} from "./info-categorie/info-categorie.component";
import {TranslateModule} from "@ngx-translate/core";
import { AffectCriterionsComponent } from './affect-criterions/affect-criterions.component';
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import { CriterionOrderComponent } from './criterion-order/criterion-order.component';



@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    NgxPaginationModule,
    FormsModule,
    TranslateModule,
    AngularMultiSelectModule
  

  ],
  declarations: [
    DashboardComponent,
    CreateCategorieComponent,
    InfoCategorieComponent,
    AffectCriterionsComponent,
    CriterionOrderComponent

  ],
})
export class DashboardModule { }

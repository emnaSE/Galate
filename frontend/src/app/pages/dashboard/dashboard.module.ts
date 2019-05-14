import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import {Ng2SmartTableModule} from "ng2-smart-table";
import {NgxPaginationModule} from "ngx-pagination";
import {CreateCategorieComponent} from "./create-categorie/create-categorie.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [
    DashboardComponent,
    CreateCategorieComponent
  ],
})
export class DashboardModule { }

import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { CriterionComponent } from './criterion.component';
import { FormsModule } from '@angular/forms';
import { CreateCriterionComponent } from './create-criterion/create-criterion.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import { CriterionInfoComponent } from './criterion-info/criterion-info.component';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    TranslateModule,
    NgxPaginationModule,
    AngularMultiSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [
    CriterionComponent,
    CreateCriterionComponent,
    CriterionInfoComponent,
    ],
})
export class CriterionModule { }

import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { EtalonnageComponent } from './etalonnage.component';
import { FormsModule } from '@angular/forms';
import { CreateEtalonnageComponent } from './etalonnage-ecole/create-etalonnage.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    NgxPaginationModule,
    TranslateModule,
    AngularMultiSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [
    EtalonnageComponent,
    CreateEtalonnageComponent,
  ],
})
export class EtalonnageModule { }

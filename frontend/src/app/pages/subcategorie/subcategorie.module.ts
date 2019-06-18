import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { SubcategorieComponent } from './subcategorie.component';
import { FormsModule } from '@angular/forms';
import { CreateSousComponent } from './create-sous/create-sous.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import { SubInfoComponent } from './sub-info/sub-info.component';
import { AllQuestionComponent } from './all-question/all-question.component';
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
    SubcategorieComponent,
    CreateSousComponent,
    SubInfoComponent,
    AllQuestionComponent,
  ],
})
export class SubcategorieModule { }

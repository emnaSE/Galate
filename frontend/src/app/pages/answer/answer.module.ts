import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { AnswerComponent } from './answer.component';
import { FormsModule } from '@angular/forms';
import { CreateAnswerComponent } from './crate-answer/create-answer.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    NgxPaginationModule,
    AngularMultiSelectModule,
    TranslateModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [
    AnswerComponent,
    CreateAnswerComponent,
  ],
})
export class AnswerModule { }

import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { ClassComponent } from './class.component';
import { FormsModule } from '@angular/forms';
import { CreateClassComponent } from './create-class/create-class.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";

@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    NgxPaginationModule,
    AngularMultiSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  declarations: [
    ClassComponent,
    CreateClassComponent,
  ],
})
export class ClassModule { }

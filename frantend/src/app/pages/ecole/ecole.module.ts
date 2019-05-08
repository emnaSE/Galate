import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { EcoleComponent } from './ecole.component';
import { FormsModule } from '@angular/forms';
import { CreateEcoleComponent } from './create-ecole/create-ecole.component';
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
    EcoleComponent,
    CreateEcoleComponent,
  ],
})
export class EcoleModule { }

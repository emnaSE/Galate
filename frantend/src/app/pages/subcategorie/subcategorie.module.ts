import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { SubcategorieComponent } from './subcategorie.component';
import { FormsModule } from '@angular/forms';
import { CreateSousComponent } from './create-sous/create-sous.component';
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
    SubcategorieComponent,
    CreateSousComponent,
  ],
})
export class SubcategorieModule { }

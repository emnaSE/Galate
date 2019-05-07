import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { SubcategorieComponent } from './subcategorie.component';
import { FormsModule } from '@angular/forms';
import { CreateSousComponent } from './create-sous/create-sous.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    NgxPaginationModule,
  ],
  declarations: [
    SubcategorieComponent,
    CreateSousComponent,
  ],
})
export class SubcategorieModule { }

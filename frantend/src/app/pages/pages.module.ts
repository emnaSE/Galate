import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {TestModule} from "./test/test.module";
import {SubcategorieModule} from "./subcategorie/subcategorie.module";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {EcoleModule} from "./ecole/ecole.module";
import {ClassModule} from "./class/class.module";

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    TestModule,
    SubcategorieModule,
    EcoleModule,
    ClassModule,
    NgMultiSelectDropDownModule.forRoot()

  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}

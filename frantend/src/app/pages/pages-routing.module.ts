import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {TestComponent} from "./test/test.component";
import {SubcategorieComponent} from "./subcategorie/subcategorie.component";
import {CreateCategorieComponent} from "./dashboard/create-categorie/create-categorie.component";
import {CreateSousComponent} from "./subcategorie/create-sous/create-sous.component";
import {CreateTestComponent} from "./test/create-test/create-test.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'test',
      component: TestComponent,
    },
    {
      path: 'test/create',
      component:CreateTestComponent ,
    },
    {
      path: 'sous',
      component: SubcategorieComponent,
    },
    {
      path: 'sous/create',
      component: CreateSousComponent,
    },
    {
      path:"dashboard/create",
      component: CreateCategorieComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {TestComponent} from "./test/test.component";
import {SubcategorieComponent} from "./subcategorie/subcategorie.component";
import {CreateCategorieComponent} from "./dashboard/create-categorie/create-categorie.component";
import {CreateSousComponent} from "./subcategorie/create-sous/create-sous.component";
import {CreateTestComponent} from "./test/create-test/create-test.component";
import {EcoleComponent} from "./ecole/ecole.component";
import {ClassComponent} from "./class/class.component";
import {CreateEcoleComponent} from "./ecole/create-ecole/create-ecole.component";
import {EtalonnageComponent} from "./etalonnage/etalonnage.component";
import {CreateEtalonnageComponent} from "./etalonnage/etalonnage-ecole/create-etalonnage.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'categorie',
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
      path: 'ecole',
      component: EcoleComponent,
    },
    {
      path: 'sous/create',
      component: CreateSousComponent,
    },
    {
      path:"categorie/create",
      component: CreateCategorieComponent,
    },
    {
      path:"ecole/create",
      component: CreateEcoleComponent,
    },
    {
      path:"etalonnage",
      component: EtalonnageComponent,
    },
    {
      path: 'etalonnage/create',
      component:CreateEtalonnageComponent ,
    },
    {
      path:"class",
      component: ClassComponent,
    },
    {
      path: '',
      redirectTo: 'categorie',
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

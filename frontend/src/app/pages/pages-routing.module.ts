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
import {AffectCategorieComponent} from "./test/affect-categorie/affect-categorie.component";
import {AffectSubcategorieComponent} from "./test/affect-subcategorie/affect-subcategorie.component";
import {CreateClassComponent} from "./class/create-class/create-class.component";

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
      path:"categorie/:id/modifier",
      component: CreateCategorieComponent,
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
      path:"class/:id/modifier",
      component: CreateClassComponent,
    },
    {
      path:"ecole/:id/modifier",
      component: CreateEcoleComponent,
    },
    {
      path: 'test/:id/affectation',
      component:AffectCategorieComponent,
    },
    {
      path: 'test/:id/affectationsub',
      component:AffectSubcategorieComponent,
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

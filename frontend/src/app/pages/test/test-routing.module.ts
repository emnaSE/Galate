import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTestComponent } from './create-test/create-test.component';
import { TestComponent } from './test.component';
import {AffectCategorieComponent} from "./affect-categorie/affect-categorie.component";
import {AffectSubcategorieComponent} from "./affect-subcategorie/affect-subcategorie.component";




const routes: Routes = [{
  path: '',
  component: TestComponent,
  children: [
    {
      path: 'create',
      component:CreateTestComponent,
    },
    {
      path: 'affectation',
      component:AffectCategorieComponent,
    },
    {
      path: 'affectationsub',
      component:AffectSubcategorieComponent,
    },

  ],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class TestRoutingModule {

}

export const routedComponents = [
  TestComponent,
  CreateTestComponent,
  AffectCategorieComponent,
  AffectSubcategorieComponent,
];

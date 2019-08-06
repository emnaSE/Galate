import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCriterionComponent } from './create-criterion/create-criterion.component';
import { CriterionComponent } from './criterion.component';




const routes: Routes = [{
  path: '',
  component: CriterionComponent,
  children: [
    {
      path: 'create',
      component:CreateCriterionComponent,
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
export class CriterionRoutingModule {

}

export const routedComponents = [
  CriterionComponent,
  CreateCriterionComponent,
];

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEtalonnageComponent } from './etalonnage-ecole/create-etalonnage.component';
import { EtalonnageComponent } from './etalonnage.component';




const routes: Routes = [{
  path: '',
  component: EtalonnageComponent,
  children: [
    {
      path: 'create',
      component:CreateEtalonnageComponent,
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
export class EtalonnageRoutingModule {

}

export const routedComponents = [
  EtalonnageComponent,
  CreateEtalonnageComponent,
];

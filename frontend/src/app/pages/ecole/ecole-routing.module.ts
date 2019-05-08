import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEcoleComponent } from './create-ecole/create-ecole.component';
import { EcoleComponent } from './ecole.component';




const routes: Routes = [{
  path: '',
  component: EcoleComponent,
  children: [
    {
      path: 'create',
      component:CreateEcoleComponent,
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
export class EcoleRoutingModule {

}

export const routedComponents = [
  EcoleComponent,
  CreateEcoleComponent,
];

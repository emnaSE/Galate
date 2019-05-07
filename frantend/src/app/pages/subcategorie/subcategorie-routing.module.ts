import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSousComponent } from './create-sous/create-sous.component';
import { SubcategorieComponent } from './subcategorie.component';




const routes: Routes = [{
  path: '',
  component: SubcategorieComponent,
  children: [
    {
      path: 'create',
      component:CreateSousComponent,
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
export class SubcategorieRoutingModule {

}

export const routedComponents = [
  SubcategorieComponent,
  CreateSousComponent,
];

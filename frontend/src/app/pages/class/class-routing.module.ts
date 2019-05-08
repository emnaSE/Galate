import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateClassComponent } from './create-class/create-class.component';
import { ClassComponent } from './class.component';




const routes: Routes = [{
  path: '',
  component: ClassComponent,
  children: [
    {
      path: 'create',
      component:CreateClassComponent,
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
export class ClassRoutingModule {

}

export const routedComponents = [
  ClassComponent,
  CreateClassComponent,
];

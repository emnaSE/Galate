import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTestComponent } from './create-test/create-test.component';
import { TestComponent } from './test.component';




const routes: Routes = [{
  path: '',
  component: TestComponent,
  children: [
    {
      path: 'create',
      component:CreateTestComponent,
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
];

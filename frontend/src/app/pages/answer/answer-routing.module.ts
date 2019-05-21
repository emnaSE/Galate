import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAnswerComponent } from './answer-question/create-answer.component';
import { AnswerComponent } from './answer.component';




const routes: Routes = [{
  path: '',
  component: AnswerComponent,
  children: [
    {
      path: 'create',
      component:CreateAnswerComponent,
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
export class AnswerRoutingModule {

}

export const routedComponents = [
  AnswerComponent,
  CreateAnswerComponent,
];

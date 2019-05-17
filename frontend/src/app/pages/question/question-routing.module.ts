import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { QuestionComponent } from './question.component';




const routes: Routes = [{
  path: '',
  component: QuestionComponent,
  children: [
    {
      path: 'create',
      component:CreateQuestionComponent,
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
export class QuestionRoutingModule {

}

export const routedComponents = [
  QuestionComponent,
  CreateQuestionComponent,
];

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
import {QuestionComponent} from "./question/question.component";
import {CreateQuestionComponent} from "./question/create-question/create-question.component";
import {InfoCategorieComponent} from "./dashboard/info-categorie/info-categorie.component";
import {AuthGuard} from "./auth/auth.guard";
import {AnswerComponent} from "./answer/answer.component";
import {CreateAnswerComponent} from "./answer/crate-answer/create-answer.component";
import {HomeComponent} from "./home/home.component";
import {SubInfoComponent} from "./subcategorie/sub-info/sub-info.component";
import {NotFoundComponent} from "./miscellaneous/not-found/not-found.component";
import {AllQuestionComponent} from "./subcategorie/all-question/all-question.component";
import {UpdateQuestionComponent} from "./question/create-question/update-question.component";
import {TestOrderComponent} from "./test/test-order/test-order.component";
import {DuplicationComponent} from "./test/duplication/duplication.component";
import { CriterionComponent } from './criterion/criterion.component';
import { CreateCriterionComponent } from './criterion/create-criterion/create-criterion.component';
import { CriterionInfoComponent } from './criterion/criterion-info/criterion-info.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,canActivate: [AuthGuard],
  children: [
    {
      path: 'categorie',
      component: DashboardComponent,canActivate: [AuthGuard],
    },
    {
      path: 'categorie/:id',
      component: DashboardComponent,canActivate: [AuthGuard],
    },
    {
      path:"categories/create",
      //component: CreateCategorieComponent,
      component: CreateCategorieComponent,
    },
    {
      path:"categorie/:id/modifier",
      component: CreateCategorieComponent,
      //component: CreateCategorieComponent,
    },
    {
      path:"categorie/:id/info",
      component: InfoCategorieComponent,
      //component: InfoCategorieComponent,
    },
    {
      path: 'test',
      component: TestComponent,canActivate: [AuthGuard],
    },
    {
      path: 'test/create',
      //component:CreateTestComponent,
      component:CreateTestComponent,canActivate: [AuthGuard],
    },
    {
      path: 'sous',
      component: SubcategorieComponent,canActivate: [AuthGuard],
      //component: SubcategorieComponent,
    },
    {
      path: 'ecole',
      component: EcoleComponent,canActivate: [AuthGuard],
      // component: EcoleComponent,
    },
    {
      path: 'sous/create',
      //component: CreateSousComponent,
      component: CreateSousComponent,canActivate: [AuthGuard],
    },
    {
      path: 'sous/:id/modifier',
      //component: CreateSousComponent,
      component: CreateSousComponent,canActivate: [AuthGuard],
    },
    {
      path: 'sous/:id/info',
      //component: CreateSousComponent,
      component: SubInfoComponent,canActivate: [AuthGuard],
    },
    {
      path: 'test/duplication',
      //component: CreateSousComponent,
      component: DuplicationComponent,canActivate: [AuthGuard],
    },

    {
      path:"ecole/create",
      //component: CreateEcoleComponent,
      component: CreateEcoleComponent,canActivate: [AuthGuard],
    },


    {
      path:"etalonnage",
      component: EtalonnageComponent,canActivate: [AuthGuard],
      //component: EtalonnageComponent,
    },
    {
      path: 'etalonnage/create',
      //component:CreateEtalonnageComponent ,
      component:CreateEtalonnageComponent ,canActivate: [AuthGuard],
    },
    {
      path: 'etalonnage/:id/modifier',
      //component:CreateEtalonnageComponent ,
      component:CreateEtalonnageComponent ,canActivate: [AuthGuard],
    },
    {
      path:"class",
      component: ClassComponent,canActivate: [AuthGuard],
      //component: ClassComponent,
    },
    {
      path:"question",
      component: QuestionComponent,canActivate: [AuthGuard],
      //component: QuestionComponent,
    },
    {
      path:"question/create/:id",
      //component: CreateQuestionComponent,
      component: CreateQuestionComponent,canActivate: [AuthGuard],
    },


    {
      path:"question/:id/modifier",
      component: UpdateQuestionComponent,canActivate: [AuthGuard],
      //component: CreateQuestionComponent,
    },
    {
      path:"class/:id/modifier",
      component: CreateClassComponent,canActivate: [AuthGuard],
      //component: CreateClassComponent,
    },

    {
      path:"class/create",
      component: CreateClassComponent,canActivate: [AuthGuard],
      //component: CreateClassComponent,
    },
    {
      path:"ecole/:id/modifier",
      component: CreateEcoleComponent,canActivate: [AuthGuard],
      //component: CreateEcoleComponent,
    },
    {
      path: 'test/:id/affectation',
      //component:AffectCategorieComponent,
      component:AffectCategorieComponent,canActivate: [AuthGuard],
    },
    {
      path: 'test/:id/affectationsub',
      //component:AffectSubcategorieComponent,
      component:AffectSubcategorieComponent,canActivate: [AuthGuard],
    },
    {
      path: 'test/:id/modifier',
      //component:CreateTestComponent,
      component:CreateTestComponent,canActivate: [AuthGuard],
    },

    {
      path:"answer/:id/question",
      component: AnswerComponent,canActivate: [AuthGuard],
      //component: AnswerComponent,
    },
    {
      path:"answer/:id/modifier",
      component: CreateAnswerComponent,canActivate: [AuthGuard],
      //component: CreateAnswerComponent,
    },
    {
      path: 'sous/:id',
      component: SubcategorieComponent,canActivate: [AuthGuard],
      //component: SubcategorieComponent,
    },
    {
      path: 'stat',
      component: HomeComponent,canActivate: [AuthGuard],
      //component: SubcategorieComponent,
    },
    {
      path: 'test/all/:id',
      component: AllQuestionComponent,canActivate: [AuthGuard],
      //component: SubcategorieComponent,
    },
    {
      path: '',
      redirectTo: 'stat',
      pathMatch: 'full',
    },
    {
      path: 'test/:id/ordre',
      //component:AffectSubcategorieComponent,
      component:TestOrderComponent,canActivate: [AuthGuard],
    },
   {
      path: 'criterion',
      component: CriterionComponent,canActivate: [AuthGuard],
    },
    {
      path:'criterion/create',
      component: CreateCriterionComponent,
    },
    {
      path: 'criterion/:id/info',
      component: CreateCriterionComponent,canActivate: [AuthGuard],
    },
    {
      path: '**',
      component: NotFoundComponent,
    }


  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}

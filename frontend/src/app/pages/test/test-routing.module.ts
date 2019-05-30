import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTestComponent } from './create-test/create-test.component';
import { TestComponent } from './test.component';
import {AffectCategorieComponent} from "./affect-categorie/affect-categorie.component";
import {AffectSubcategorieComponent} from "./affect-subcategorie/affect-subcategorie.component";
import {AuthGuard} from "../auth/auth.guard";




const routes: Routes = [{
  path: '',
  component: TestComponent,

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

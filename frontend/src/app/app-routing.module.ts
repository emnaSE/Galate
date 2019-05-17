import {  RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {AuthComponent} from "./pages/auth/auth.component";
import {RegistreComponent} from "./pages/auth/registre/registre.component";


const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },

  {
    path: 'login',
    component:AuthComponent,
  },
  {
    path:'registre',
    component:RegistreComponent,
  },

  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

/*const config: ExtraOptions = {
  useHash: true,
};*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

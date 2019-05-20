import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import {AuthComponent} from "./pages/auth/auth.component";
import {RegistreComponent} from "./pages/auth/registre/registre.component";
import {NbAuthComponent} from "@nebular/auth";
import {AuthGuard} from "./pages/auth/auth.guard";


const routes: Routes = [
  //{ path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule',canActivate: [AuthGuard]  },
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule'},
  {
  path: 'auth',
  component: NbAuthComponent,
  children: [
  {
    path: 'login',
    component:AuthComponent,
  },
  {
    path:'registre',
    component:RegistreComponent,
  },
  ],
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes ,config )],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

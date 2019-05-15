import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';


const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },

  {
    path: 'home',
    component:HomeComponent,
  },
  {
    path: 'test',
    component:TestComponent,
  },

 
  { path: '', redirectTo: 'pages/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

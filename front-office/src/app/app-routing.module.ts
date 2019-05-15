import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { HomeComponent } from './pages/home/home.component';
import { TestComponent } from './pages/test/test.component';


const routes: Routes = [
  { path: 'pages', loadChildren: './app.module#AppModule' },

  {
    path: 'starter',
    component:StarterComponent,
  },
  {
    path: 'home',
    component:HomeComponent,
  },
  {
    path: 'test',
    component:TestComponent,
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
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

import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TestComponent } from './test/test.component';
import { ResultTableComponent } from './resultTable/resultTable.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StartTestComponent } from './startTest/startTest.component';
import { DownloadComponent } from './downloadPDF/download.component';


const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },

  {
    path: 'resultTable',
    component:ResultTableComponent,
  },
  {
    path: 'test',
    component:TestComponent,
  },
  {
    path: 'register',
    component:RegisterComponent,
  },
  {
    path: 'login',
    component:LoginComponent,
  },
  {
    path: 'startTest',
    component:StartTestComponent,
  },
  {
    path: 'download',
    component:DownloadComponent,
  },
 
  { path: '', redirectTo: 'pages/test', pathMatch: 'full' },
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

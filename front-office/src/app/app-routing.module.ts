import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { TestComponent } from './pages/test/test.component';
import { ResultTableComponent } from './pages/resultTable/resultTable.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { StartTestComponent } from './pages/startTest/startTest.component';
import { LoginTestComponent } from './pages/login-test/login-test.component';
import { DownloadComponent } from './pages/downloadPDF/download.component';
import { TestTerminatedComponent } from './pages/test-terminated/test-terminated.component';


const routes: Routes = [
  { path: 'pages', loadChildren: './app.module#AppModule' },
  {
    path: 'resultTable',
    component:ResultTableComponent,
  },
  {
    path: 'test',
    component:TestComponent,
  },
  {
    path: 'test-terminated',
    component:TestTerminatedComponent,
  },
  {
    path: 'login',
    component:LoginComponent,
  },
  {
    path: 'register',
    component:RegisterComponent,
  },
  {
    path:"startTest/:ref",
    //path: 'startTest',
    component:StartTestComponent,
  },
  {
    path: 'download',
    component:DownloadComponent,
  },
  {
    path:"loginTest/:ref",
    //path: 'loginTest',
    component:LoginTestComponent,
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
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

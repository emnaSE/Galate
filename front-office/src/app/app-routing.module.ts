
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
import {RgpdComponent} from "./rgpd/rgpd.component";
import { FinalResultComponent } from './pages/final-result/finalResult.component';
import { FinalResultComponentP2 } from './pages/final-resultP2/finalResultP2.component';



const routes: Routes = [
  { path: 'pages', loadChildren: './app.module#AppModule' },
  {
    path: 'resultTable/:idT/:idM',
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
    path:"startTest/:idT/:idM",
    //path: 'startTest',
    component:StartTestComponent,
  },
  {
    path: 'download/:idT/:idM',
    component:DownloadComponent,
  },
  {
    path:"loginTest/:idT/:idM",
    //path: 'loginTest',
    component:LoginTestComponent,
  },
  {
    path: 'finalResult/:idT/:idM',
    component:FinalResultComponent,
  },
  {
    path: 'finalResultP2/:idT/:idM',
    component:FinalResultComponentP2
  },
  {
    path: 'rgpd',
    component:RgpdComponent,
  },
 
  { path: '', redirectTo: 'register', pathMatch: 'full' },
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

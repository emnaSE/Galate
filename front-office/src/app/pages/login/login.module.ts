import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';



@NgModule({
  imports: [
  ],
  declarations: [
    LoginComponent
  ],
  providers: [LoginService]
})
export class LoginModule { }

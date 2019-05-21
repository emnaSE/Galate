import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';


import { FormsModule } from '@angular/forms';
import {AuthComponent} from "./auth.component";
import {RegistreComponent} from "./registre/registre.component";



@NgModule({
  imports: [
    ThemeModule,
    FormsModule,

  ],
  declarations: [
    AuthComponent,
    RegistreComponent,

  ],
})
export class AuthModule {


}

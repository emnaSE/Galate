import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    RegisterComponent,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule {
}

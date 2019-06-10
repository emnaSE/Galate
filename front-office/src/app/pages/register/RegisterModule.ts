import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
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

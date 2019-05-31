import { NgModule } from '@angular/core';
import { TestComponent } from './test.component';
import { TestService } from './test.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule
  ],
  declarations: [
    TestComponent,
  ],
})
export class TestModule { }

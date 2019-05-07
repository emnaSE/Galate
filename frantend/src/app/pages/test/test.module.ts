import { NgModule } from '@angular/core';


import { ThemeModule } from '../../@theme/theme.module';
import { TestComponent } from './test.component';
import { FormsModule } from '@angular/forms';
import { CreateTestComponent } from './create-test/create-test.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    NgxPaginationModule,
  ],
  declarations: [
    TestComponent,
    CreateTestComponent,
  ],
})
export class TestModule { }

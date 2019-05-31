import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThemeModule} from "../../@theme/theme.module";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {HomeComponent} from "./home.component";
import {BsDatepickerModule} from "ngx-bootstrap";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot()
  ]
})
export class HomeModule { }

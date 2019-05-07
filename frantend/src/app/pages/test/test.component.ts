import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { TestService } from './test.service';

import { Subject } from 'rxjs';
import {Test} from "./test.model";

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './test.component.html',
})
export class TestComponent  implements OnInit{
private tests:Test[];



    constructor(private testServices:TestService){

      }
  ngOnInit() {

      this.testServices.getAllTest().subscribe(
        data=>{
          this.tests=data;
        },err=>{
          console.log(err);
        }
      )


  }

  create(){
      console.log("test");
  }
}

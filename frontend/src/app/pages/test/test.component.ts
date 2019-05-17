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
       pageActuel: number =1;



    constructor(private testServices:TestService,
                private router:Router){

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
      this.router.navigate(['pages/test/create'])
  }
  affCatergorie(test:Test){
      this.router.navigate(['pages/test',test.id,'affectation']);

  }
  affSubCateg(test:Test){
      this.router.navigate(['pages/test',test.id,'affectationsub']);
  }

  updateTest(test:Test){
      this.router.navigate(['pages/test',test.id,'modifier'])
  }

}

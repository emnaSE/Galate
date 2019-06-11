import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { TestService } from './test.service';

import { Subject } from 'rxjs';
import {Test} from "./test.model";
import {Question} from "../question/question.model";
import {Class} from "../class/class.model";

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './test.component.html',
})
export class TestComponent  implements OnInit{
       tests:Test[];
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
  deleteByid(test:Test):void {
    if(confirm("êtes-vous sûr de vouloir supprimer ce test ")) {
      this.testServices.deleteTest(test.id).subscribe(
        data=>{
          if(data==="success"){

            alert("cette test est lié à des sous categorie vous ne pouvez pas le supprimer");
          }else
            if (data=="failure"){
            alert("Vous ne pouvez pas supprimer ce test car il est lieé a categorie");

          }
          this.router.navigate(['pages/test'])
          this.testServices.getAllTest().subscribe(
            data=>{
              this.tests=data;
            },err=>{
              console.log(err);

            }
          )

          this.tests=this.tests.filter(t=>t !==test)
          this.router.navigate(['pages/test'])


        },err =>{
          console.log(err);
        }
      )}
  };

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

  getinfo(test:Test){
    this.router.navigate(['pages/test/all',test.id]);
  }

  public telecharger (test:Test){


    this.testServices.generateXMLFile(test.id).subscribe(
      data=>{
        console.log("telegarchement avec succes");


      }
    )}


}

import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from "@angular/router";
import { TestService } from './test.service';

import { Subject } from 'rxjs';
import {Test} from "./test.model";
import {Question} from "../question/question.model";
import {Class} from "../class/class.model";
import { AlertsService } from 'angular-alert-module';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './test.component.html',
})
export class TestComponent  implements OnInit{
       tests:Test[];
       err:any;
       pageActuel: number =1;
       modalRef: BsModalRef;
       message: string;
     


    constructor(private testServices:TestService,
                private router:Router, 
                private alerts: AlertsService , private modalService: BsModalService){

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


  confirm(test:Test): void {

    this.testServices.deleteTest(test.id).subscribe(
      data=>{
        if(data==="success"){

          //alert("cette test est liée à des sous categorie vous ne pouvez pas le supprimer");
          this.alerts.setMessage('supprimée avec succès!','warn');
        
        }else
          if (data=="failure"){
            this.alerts.setMessage('Ce test est liée à des sous categorie vous ne pouvez pas le supprimer', 'warn');
           //this.err=1;

           alert("ce test est liée à des sous categorie vous ne pouvez pas le supprimer!")
          
          //alert("Vous ne pouvez pas supprimer ce test !");

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
    )
     
    this.modalRef.hide();
  }
 
  decline(): void {
  
    this.modalRef.hide();
  }



  deleteByid(test:Test , template: TemplateRef<any>):void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
   /* if(confirm("êtes-vous sûr de vouloir supprimer ce test ")) {
      this.testServices.deleteTest(test.id).subscribe(
        data=>{
          if(data==="success"){

            //alert("cette test est liée à des sous categorie vous ne pouvez pas le supprimer");
            this.alerts.setMessage('All the fields are required','confirm');
          
          }else
            if (data=="failure"){
              this.alerts.setMessage('All the fields are required','confirm');
            //alert("Vous ne pouvez pas supprimer ce test !");

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
      )}*/
  };

  create(){
      this.router.navigate(['pages/test/create'])
  }

  duplication(){
    this.router.navigate(['pages/test/duplication'])
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
        //console.log("telegarchement avec succes");
          alert("telegarchement avec succes");

      }
    )}


}

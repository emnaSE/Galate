import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import { Subject } from 'rxjs';
import {Ecole} from "../ecole/ecole.model";
import {Class} from "./class.model";
import {ClassService} from "./class.service";


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './class.component.html',
})
export class ClassComponent  implements OnInit{
  pageActuel: number =1;
  private classes:Class[];




    constructor(private router:Router,
                private classService:ClassService){

      }
  ngOnInit() {

      this.classService.getAllClass().subscribe(
        data=>{
          this.classes=data;
        },err=>{
          console.log(err);
        }
      )




  }

  create(){
      this.router.navigate(['pages/sous/create']);
  }
  updateClass(clas:Class):void{
    this.router.navigate(['pages/class/',clas.id,'modifier']);

  }


  deleteByid(clas:Class):void {
    if(confirm("êtes-vous sûr de vouloir supprimer le cette class ")) {
      this.classService.deleteClass(clas.id).subscribe(
        data=>{
          if(data==="success"){

            alert("Suppression avec succès");
          }else{
            alert("Vous ne pouvez pas supprimer cette class");

          }
          this.router.navigate(['pages/class'])
          this.classService.getAllClass().subscribe(
            data=>{
              this.classes=data;
            },err=>{
              console.log(err);

            }
          )

          this.classes=this.classes.filter(c=>c !==clas)
          this.router.navigate(['pages/class'])


        },err =>{
          console.log(err);
        }
      )}
  };



}

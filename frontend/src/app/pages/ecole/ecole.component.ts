import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import { Subject } from 'rxjs';
import {Categorie} from "../dashboard/categorie.model";
import {Ecole} from "./ecole.model";
import {EcoleService} from "./ecole.service";


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './ecole.component.html',
})
export class EcoleComponent  implements OnInit{
  pageActuel: number =1;
  private ecoles:Ecole[]




    constructor(private router:Router,
                private ecoleService:EcoleService){

      }
  ngOnInit() {
    this.ecoleService.getAllEcole().subscribe(
      data=>{
        this.ecoles=data;

      },err=>{
        console.log(err);
      }
    )




  }

  create(){
      this.router.navigate(['pages/ecole/create']);
  }
  updateEcole(ecole:Ecole):void{
    this.router.navigate(['pages/ecole/',ecole.id,'modifier']);

  }


  deleteByid(ecole:Ecole):void {
    if(confirm("êtes-vous sûr de vouloir supprimer le cette ecole ")) {
      this.ecoleService.deleteEcole(ecole.id).subscribe(
        data=>{
          if(data==="success"){

            alert("Suppression avec succès");
          }else{
            alert("Vous ne pouvez pas supprimer cette categorie");

          }
          this.router.navigate(['pages/ecole'])
          this.ecoleService.getAllEcole().subscribe(
            data=>{
              this.ecoles=data;
            },err=>{
              console.log(err);

            }
          )

          this.ecoles=this.ecoles.filter(e=>e !==ecole)
          this.router.navigate(['pages/ecole'])


        },err =>{
          console.log(err);
        }
      )}
  };




}

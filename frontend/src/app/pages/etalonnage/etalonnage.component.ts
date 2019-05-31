import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import { Subject } from 'rxjs';
import {Etalonnage} from "./etalonnage.model";
import {EtalonnageService} from "./etalonnage.service";
import {SousCategorie} from "../subcategorie/subcategorie.model";


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './etalonnage.component.html',
})
export class EtalonnageComponent  implements OnInit{
  pageActuel: number =1;
  etalonages:Etalonnage[]




    constructor(private router:Router,
                private etalonnageService:EtalonnageService){

      }
  ngOnInit() {

    this.etalonnageService.getAllEtalonage().subscribe(
      data=>{
        this.etalonages=data;
      },err=>{
        console.log(err);
      }
    )




  }

  create(){
      this.router.navigate(['pages/etalonnage/create']);
  }
  deleteByid(etalonnage:Etalonnage):void {
    if(confirm("êtes-vous sûr de vouloir supprimer le cette Etalonage ")) {
      this.etalonnageService.deleteEtalonage(etalonnage.id).subscribe(
        data=>{
          if(data==="success"){

            alert("Suppression avec succès");
          }else{
            alert("Vous ne pouvez pas supprimer cette etalonnage");

          }
          this.router.navigate(['pages/etalonnage'])
          this.etalonnageService.getAllEtalonage().subscribe(
            data=>{
              this.etalonages=data;
            },err=>{
              console.log(err);

            }
          )

          this.etalonages=this.etalonages.filter(e=>e !==etalonnage)
          this.router.navigate(['pages/etalonnage'])


        },err =>{
          console.log(err);
        }
      )}
  };

  updateEtalonage(etalonnage:Etalonnage){
    this.router.navigate(['pages/etalonnage/',etalonnage.id,"modifier"]);
  }


}

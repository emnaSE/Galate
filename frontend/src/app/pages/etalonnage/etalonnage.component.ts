import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import { Subject } from 'rxjs';
import {Etalonnage} from "./etalonnage.model";
import {EtalonnageService} from "./etalonnage.service";


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
  deleteEtalonage(etalonage:Etalonnage):void{
    this.etalonnageService.deleteEtalonage(etalonage.id).subscribe(
      data=>{
        alert("delete avec succes");
      },err=>{
        console.log(err);
      }
    )

  }

  updateEtalonage(etalonnage:Etalonnage){
    this.router.navigate(['pages/etalonnage/',etalonnage.id,"modifier"]);
  }
}

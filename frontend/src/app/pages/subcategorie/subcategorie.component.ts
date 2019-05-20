import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import { Subject } from 'rxjs';
import {SousCategorie} from "./subcategorie.model";
import {SubcategorieService} from "./subcategorie.service";
import {Categorie} from "../dashboard/categorie.model";


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './subcategorie.component.html',
})
export class SubcategorieComponent  implements OnInit{
  pageActuel: number =1;
  sousCategories:SousCategorie[]




    constructor(private router:Router,
                private sousCategorieService:SubcategorieService){

      }
  ngOnInit(): void {
    this.sousCategorieService.getAllSousCategorie().subscribe(
      data=>{
        this.sousCategories=data;
      },err=>{
        console.log(err);
      }
    )
  }

  create(){
      this.router.navigate(['pages/sous/create']);
  }
  updateSousCategorie(sousCategorie:SousCategorie):void{
    this.router.navigate(['pages/sous/',sousCategorie.id,'modifier']);

  }


  deleteByid(sousCategorie:SousCategorie):void {
    if(confirm("êtes-vous sûr de vouloir supprimer le cette Souscategorie ")) {
      this.sousCategorieService.deleteSousCategorie(sousCategorie.id).subscribe(
        data=>{
          if(data==="success"){

            alert("Suppression avec succès");
          }else{
            alert("Vous ne pouvez pas supprimer cette categorie");

          }
          this.router.navigate(['pages/sous'])
          this.sousCategorieService.getAllSousCategorie().subscribe(
            data=>{
              this.sousCategories=data;
            },err=>{
              console.log(err);

            }
          )

          this.sousCategories=this.sousCategories.filter(s=>s !==sousCategorie)
          this.router.navigate(['pages/sous'])


        },err =>{
          console.log(err);
        }
      )}
  };



}


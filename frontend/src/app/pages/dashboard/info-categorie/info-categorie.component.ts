import { Component, OnInit } from '@angular/core';
import {CategorieService} from "../categorie.service";
import {SousCategorie} from "../../subcategorie/subcategorie.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'info-categorie',
  templateUrl: './info-categorie.component.html',
  styleUrls: ['./info-categorie.component.scss']
})
export class InfoCategorieComponent implements OnInit {
  sousCategories:SousCategorie[]
  id:number;
  pageActuel: number =1;
  constructor(private categorieService:CategorieService,
              private activateRouter:ActivatedRoute) { }

  ngOnInit() {
     this.id=this.activateRouter.snapshot.params['id'];
     console.log(this.id)
     this.categorieService.getAllSouCategorie(this.id).subscribe(
       data=>{
         this.sousCategories=data;
       },err=>{
         console.log(err)
       }
     )
  }

}

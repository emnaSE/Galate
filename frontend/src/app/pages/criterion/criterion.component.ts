import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import { Subject } from 'rxjs';
import {Criterion} from "./criterion.model";
import {CriterionService} from "./criterion.service";
import {Categorie} from "../dashboard/categorie.model";
import { SousCategorie } from '../subcategorie/subcategorie.model';
import { SubcategorieService } from '../subcategorie/subcategorie.service';


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './criterion.component.html',
})
export class CriterionComponent  implements OnInit{
  pageActuel: number =1;
  sousCategories:SousCategorie[]
  id:number;
  isAvailable = false;



    constructor(private router:Router,
                private criterionService:CriterionService,
                private activatedRouter:ActivatedRoute){
  this.id = this.activatedRouter.snapshot.params['id'];
      }
  ngOnInit(): void {

      if (this.id){
        this.isAvailable = true;
        this.criterionService.getAllCriterionsByTestId(this.id).subscribe(
          data=>{
            this.sousCategories=data;
          },err=>{
            console.log(err);
          }
        )
      }else{
        this.criterionService.getAllCriterions().subscribe(
          data=>{
            this.sousCategories=data;
          },err=>{
            console.log(err);
          }
        )

      }

  }

  create(){
      this.router.navigate(['pages/criterion/create']);
  }
  updateCriterion(criterion:SousCategorie):void{
    this.router.navigate(['pages/criterion/',criterion.id,'info']);

  }


  deleteByid(sousCategorie:SousCategorie):void {
    if(confirm("êtes-vous sûr de vouloir supprimer le ce critère? ")) {
      this.criterionService.deleteCriterion(sousCategorie.id).subscribe(
        data=>{
          if(data==="success"){

            alert("ce critère est lié à des  sous-categorie vous ne pouvez pas le supprimer");
          }else{
            alert("Vous ne pouvez pas supprimer ce critère");

          }
          this.router.navigate(['pages/criterion'])
          this.criterionService.getAllCriterions().subscribe(
            data=>{
              this.sousCategories=data;
            },err=>{
              console.log(err);

            }
          )

          this.sousCategories=this.sousCategories.filter(s=>s !==sousCategorie)
          this.router.navigate(['pages/criterion'])


        },err =>{
          console.log(err);
        }
      )
    }
  };


    consulterQuestion(subCategorie:SousCategorie){
      console.log(subCategorie.name);
      this.router.navigate(['pages/criterion',subCategorie.id,'info']);
      localStorage.setItem('catnom',subCategorie.name);
    }


}


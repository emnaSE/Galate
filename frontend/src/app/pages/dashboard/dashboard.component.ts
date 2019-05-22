import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {ActivatedRoute, Router} from "@angular/router";
import {CategorieService} from "./categorie.service";
import {Categorie} from "./categorie.model";
import {TestService} from "../test/test.service";

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{

   categories:Categorie[]
  pageActuel: number =1;
   id:number;
   Valid=false;


  constructor(private router: Router,
              private categorieServcie:CategorieService,
              private testService:TestService,
              private activatedRouter:ActivatedRoute) {

    this.id = this.activatedRouter.snapshot.params['id'];
  }


  ngOnInit(): void {

    if (this.id){
      this.Valid=true;
      this.testService.getAllCategoriesByTestId(this.id).subscribe(
        data=>{
          this.categories=data;
        },err=>{
          console.log(err);
        }
      )
    }else{
      this.categorieServcie.getAllCategorie().subscribe(
        data=>{
          this.categories=data;
        },err=>{
          console.log(err);
        }
      )

    }

  }
  create(){
    this.router.navigate(['pages/categorie/create']);
  }

  updateCategorie(categorie:Categorie):void{
    this.router.navigate(['pages/categorie/',categorie.id,'modifier']);

  }
  getInfo(categorie:Categorie){
    this.router.navigate(['pages/categorie/',categorie.id,'info']);
  }


  deleteByid(categorie:Categorie):void {
    if(confirm("êtes-vous sûr de vouloir supprimer le cette categorie ")) {
      this.categorieServcie.deleteCategorie(categorie.id).subscribe(
        data=>{
          if(data==="success"){

            alert("Suppression avec succès");
          }else{
            alert("Vous ne pouvez pas supprimer cette categorie");

          }
          this.router.navigate(['pages/categorie'])
          this.categorieServcie.getAllCategorie().subscribe(
            data=>{
              this.categories=data;
            },err=>{
              console.log(err);

            }
          )

          this.categories=this.categories.filter(c=>c !==categorie)
          this.router.navigate(['pages/categorie'])


        },err =>{
          console.log(err);
        }
      )}
  };



}

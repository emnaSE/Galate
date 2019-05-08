import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {Router} from "@angular/router";
import {CategorieService} from "./categorie.service";
import {Categorie} from "./categorie.model";

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{

  private categories:Categorie[]

  constructor(private router: Router,
              private categorieServcie:CategorieService) {
  }


  ngOnInit(): void {
      this.categorieServcie.getAllCategorie().subscribe(
        data=>{
          this.categories=data;
        },err=>{
          console.log(err);
        }
      )
  }

}

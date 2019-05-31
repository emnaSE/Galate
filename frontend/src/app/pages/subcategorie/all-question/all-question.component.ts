import { Component, OnInit } from '@angular/core';
import {SubcategorieService} from "../subcategorie.service";
import {TestService} from "../../test/test.service";
import {SousCategorie} from "../subcategorie.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'all-question',
  templateUrl: './all-question.component.html',
  styleUrls: ['./all-question.component.scss']
})
export class AllQuestionComponent implements OnInit {
  subCategories:any;
  categories:any;
  questions:any;
  catalogueDetails:any[];
  id_test:any;
  test_name:string;
  public object : any ;
  public items: Array<string>;
  constructor(private subCategorieService:SubcategorieService,
              private testService:TestService,
              private router: Router,
              private activatedRouter:ActivatedRoute) {

    this.id_test = this.activatedRouter.snapshot.params['id'];
    localStorage.setItem('catnom',this.id_test);
   // this.id_test=this.testService.currentTestValue.id;
    this.test_name=this.testService.currentTestValue.name;
    this.items = ["1", "2", "3" , "4", "5", "6" , "7", "8", "9", "10", "11"]
  }


  ngOnInit() {

    this.subCategorieService.getAlltestQuestion(this.id_test).subscribe(
      data=>{
        this.object=data;
        this.catalogueDetails=data;
        //this.catalogueDetails = Array.of(this.catalogueDetails);



        console.log("this is the list   " +JSON.stringify(data));
      },err=>{
        console.log(err)
      }
    )

  }
  getinfo(subCategorie:SousCategorie){
    this.router.navigate(['pages/sous',subCategorie.id,'info']);
  }

}

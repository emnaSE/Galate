import { Component, OnInit } from '@angular/core';
import {SubcategorieService} from "../subcategorie.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SousCategorie} from "../subcategorie.model";
import {TestService} from "../../test/test.service";
import {Question} from "../../question/question.model";
import {Answer} from "../../answer/answer.model";

@Component({
  selector: 'sub-info',
  templateUrl: './sub-info.component.html',
  styleUrls: ['./sub-info.component.scss']
})
export class SubInfoComponent implements OnInit {
  pageActuel:number=1;
  subCategories:any;
  questions:any;
  id:number;
  name:string
  test_id:any;
  constructor(private subCategorieService:SubcategorieService,
              private activatedRouter:ActivatedRoute,
              private testService:TestService,
              private router:Router) {

    this.id = this.activatedRouter.snapshot.params['id'];
    console.log(this.id);
    this.test_id = localStorage.getItem('catnom');
    console.log(this.test_id);
  }

  ngOnInit() {



    this.subCategorieService.getAllTest(this.id).subscribe(
      data=>{
        this.subCategories=data;
        this.name=this.subCategories.subcategory;
        this.questions=this.subCategories.questions;
        console.log(this.questions)
      },err=>{
        console.log(err);
      }
    )
  }


  update(question:Question){
    console.log(question.id_question)
    this.router.navigate(['pages/answer',question.id_question,'question'])
   // console.log(this.questions.question.id);
    //this.router.navigate(['pages/answer/',question.id_question,'modifier'])


  }

}

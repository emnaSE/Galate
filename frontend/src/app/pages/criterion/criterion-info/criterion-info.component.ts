import { Component, OnInit } from '@angular/core';
import {CriterionService} from "../criterion.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TestService} from "../../test/test.service";
import {Answer} from "../../answer/answer.model";
import { SubcategorieService } from '../../subcategorie/subcategorie.service';
import { Question } from '../../question/question.model';

@Component({
  selector: 'sub-info',
  templateUrl: './criterion-info.component.html',
  styleUrls: ['./criterion-info.component.scss']
})
export class CriterionInfoComponent implements OnInit {
  pageActuel:number=1;
  subCategories:any;
  questions:any;
  id:number;
  name:string
  test_id:any;
  constructor(private criterionService:CriterionService,
              private activatedRouter:ActivatedRoute,
              private testService:TestService,
              private router:Router) {

    this.id = this.activatedRouter.snapshot.params['id'];
    console.log(this.id);
    this.test_id = localStorage.getItem('catnom');
    console.log(this.test_id);
  }

  ngOnInit() {



    this.criterionService.getCriterionById(this.id).subscribe(
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

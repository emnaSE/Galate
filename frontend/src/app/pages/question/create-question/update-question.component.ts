import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, AbstractControl, FormControl, FormGroup, Validators, FormArray} from "@angular/forms";
import {SousCategorie} from "../../subcategorie/subcategorie.model";
import {QuestionService} from "../question.service";
import {Ecole} from "../../ecole/ecole.model";
import {SubcategorieService} from "../../subcategorie/subcategorie.service";
import {TestService} from "../../test/test.service";



@Component({
  selector: 'create-commercial',
  templateUrl: './update-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class UpdateQuestionComponent implements OnInit {

  id:number;
  updateForm:FormGroup;
  valid=false;
  valid1=false;
  submitted = false;
  constructor(private router:Router,
              private formBuilder:FormBuilder,
              private activateRouter:ActivatedRoute,
              private questionService:QuestionService,
              private sousCategorieService:SubcategorieService,
              private testService:TestService
             ){


  this.id=this.activateRouter.snapshot.params['id'];


  }




  ngOnInit() {


  this.updateForm=this.formBuilder.group({
    value: new FormControl('', [Validators.required]),
    ordre: new FormControl('', [Validators.required]),



  });



  if(this.id){


      this.questionService.getQuestionById(this.id).subscribe(
        (value:any)=>{
          this.updateForm.patchValue(value);
        },err=>{
          console.log(err)
        }
      )
    }

  }


  get formvalidate(){
    return this.updateForm.controls;
  }
  onSubmit(){
    this.submitted = true;


    if(this.id){
      if(this.updateForm.valid){
        this.questionService.updateById(this.id,this.updateForm.value).subscribe(
          data=>{
            alert("modifiée avec succès ")
            this.router.navigate(['pages/question'])
          },err=>{
            console.log(err);
          }
        )
      }
    }

  }



}

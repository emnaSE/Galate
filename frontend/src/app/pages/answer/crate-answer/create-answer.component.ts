import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder,AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {SousCategorie} from "../../subcategorie/subcategorie.model";
import {AnswerService} from "../answer.service";
import {Ecole} from "../../ecole/ecole.model";
import {SubcategorieService} from "../../subcategorie/subcategorie.service";
import {QuestionService} from "../../question/question.service";
import {Question} from "../../question/question.model";



@Component({
  selector: 'create-commercial',
  templateUrl: './create-answer.component.html',
  styleUrls: ['./create-answer.component.scss']
})
export class CreateAnswerComponent implements OnInit {
  dropdownList = [];
  sousCategorie:SousCategorie[];
  id:number;
  editMode=false;
  selectedItems = [];
  dropdownSettings = {};

  addForm:FormGroup;
  submitted = false;
  constructor(private router:Router,
              private formBuilder:FormBuilder,
              private activateRouter:ActivatedRoute,
              private questionService:QuestionService,
              private answerService:AnswerService

             ){


  this.id=this.activateRouter.snapshot.params['id'];


  }

  ngOnInit() {
    this.addForm=this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      ordre: [[], Validators.required],
      value: [[], Validators.required],
      //id_question: [[], Validators.required],

    });



    this.questionService.getAllQuestion().subscribe(
      data=>{
          this.dropdownList=data.map((que:Question)=>{
          return{id:que.id,itemName:que.name}
        })
      }
    )


   //par id if update methode
    if (this.id){
      this.answerService.getAnswerById(this.id).subscribe(
        (value:any)=>{
          this.addForm.patchValue(value);
        }
      )
    }

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      enableSearchFilter:true
    };




  }


  get formvalidate(){
    return this.addForm.controls;
  }
  onSubmit(){

  /*  let data={... this.addForm.value}
    data.id_question=data.id_question.map(
      c=>{
        return c.id
      }
    )*/
    if (this.id){
      if(this.addForm.valid){
        this.answerService.updateAnswer(this.id,this.addForm.value).subscribe(
          data=>{
            alert("modifier avec succces");
            this.router.navigate(['pages/question']);
          },err=>{
            console.log(err);
          }
        )
      }
    }else{
      if(this.addForm.valid){
        this.answerService.addAnswer(this.addForm.value).subscribe(
          data=>{
            alert("ajouter avec succes");

            this.router.navigate(['pages/question']);

          },err=>{
            console.log(err);
          }
        )
      }
    }


  }





  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


}

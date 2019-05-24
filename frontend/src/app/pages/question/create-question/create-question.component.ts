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
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {
  dropdownList = [];
  sousCategorie:SousCategorie[];
  id:number;
  editMode=false;
  selectedItems = [];
  dropdownSettings = {};
  test_id:any;
  create=false;
  name_test:string;
  answers:FormArray;
  addForm:FormGroup;
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

  this.name_test=this.testService.currentTestValue.name;
  this.test_id=this.testService.currentTestValue.id;
  console.log(this.name_test,this.test_id);
  }


  createAnswers(): FormGroup {
    return this.formBuilder.group({
      valeur: ["", Validators.required],
      name: ["", Validators.required],
      ordre: ["", Validators.required],
    });
  }
  ngOnInit() {






    this.addForm = this.formBuilder.group({

        name: new FormControl('', [Validators.required]),
        wording: ['', Validators.required],
        value: ['', Validators.required],

      answers: this.formBuilder.array([this.addReponseGroup()])
    });



    this.sousCategorieService.getAllSousCategorie().subscribe(
      data=>{
        this.dropdownList =data.map((sous:SousCategorie)=>{
          return{id:sous.id, itemName:sous.name};
        })
      }
    )

    this.questionService.getQuestionById(this.id).subscribe(
      (data:any)=>{
       // this.addForm.patchValue(data);
        this.selectedItems=this.dropdownList.filter(
          c=>{
            return c.id==this.id;
          }
        )
      }
    )

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


   /* this.testinfo=localStorage.getItem("currentTest");
    //this.name_test=this.testinfo.name;
    let nameTest=this.testinfo.valueOf().name;
    console.log(this.testinfo)
    console.log(nameTest);*/

  }


  get formvalidate(){
    return this.addForm.controls;
  }
  onSubmit(){
    this.submitted = true;

    let data ={... this.addForm.value}
    data.id_test_subcategory = data.id_test_subcategory.map(
      s=>{
      return s.id;
    })
    if(this.id){
      if(this.addForm.valid){
        this.questionService.updateById(this.id,data).subscribe(
          data=>{
            alert("update avec succes")
          },err=>{
            console.log(err);
          }
        )
      }
    }else{
      if ( this.addForm.valid){
        this.questionService.addQuestion(data).subscribe(
          data=>{
            alert("ajouter avec succes")
          },err=>{
            console.log(err);
          }
        )
      }
    }

  }

      onCreate(){
console.log("test id");
console.log(this.test_id);

        console.log("test id sub cat");
        console.log(this.id);
          this.questionService.addQuestionByIdSub(this.id,this.test_id,this.addForm.value).subscribe(
            data=>{
              alert("suucess");
            },err=>{
              console.log(err);
            }
          )
      }



  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


  addReponseGroup() {
    return this.formBuilder.group({
      value: ['', Validators.required],
      name: ['', Validators.required],
      ordre: ['', Validators.required],
    });
  }

  addReponse() {
    this.valid=true;
    this.create=true;
    this.reponseArray.push(this.addReponseGroup());

  }
  removeReponse(index) {
    this.valid1=true;
    this.reponseArray.removeAt(index);

  }
  get reponseArray() {
    return <FormArray>this.addForm.get('answers');
  }


}

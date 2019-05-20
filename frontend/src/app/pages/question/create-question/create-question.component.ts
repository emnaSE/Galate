import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder,AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {SousCategorie} from "../../subcategorie/subcategorie.model";
import {QuestionService} from "../question.service";
import {Ecole} from "../../ecole/ecole.model";
import {SubcategorieService} from "../../subcategorie/subcategorie.service";



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

  addForm:FormGroup;
  submitted = false;
  constructor(private router:Router,
              private formBuilder:FormBuilder,
              private activateRouter:ActivatedRoute,
              private questionService:QuestionService,
              private sousCategorieService:SubcategorieService){





  }

  ngOnInit() {
    this.addForm=this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      wording: [[], Validators.required],
      value: [[], Validators.required],
      id_test_subcategory: [[], Validators.required],

    });
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

    this.sousCategorieService.getAllSousCategorie().subscribe(
      data=>{
        this.dropdownList =data.map((sous:SousCategorie)=>{
          return{id:sous.id, itemName:sous.name};
        })
      }
    )



    /*

    this.sousCategorie.getAllSousCategorie().subscribe(
      data=>{
        this.dropdownList =data.map((scat:SousCategorie)=>{
          return{id:scat.id, itemName:scat.name};
        })
      }
    )
     */


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
    console.log("workk")
  }





  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


}

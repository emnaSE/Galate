import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategorieService} from "../../dashboard/categorie.service";
import {Categorie} from "../../dashboard/categorie.model";
import {TestService} from "../test.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'affect-categorie',
  templateUrl: './affect-categorie.component.html',
  styleUrls: ['./affect-categorie.component.scss']
})
export class AffectCategorieComponent implements OnInit {
  id:number;
  dropdownList = [];
  selectedItems = [];
  settings = {};
  addForm:FormGroup;
  submitted = false;

  constructor(private categorieService:CategorieService,
              private formBuilder:FormBuilder,
              private testService:TestService,
              private activateRoute:ActivatedRoute) { }

  ngOnInit() {
    this.addForm=this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      dateActivation: new FormControl('', [Validators.required]),
      dateExpiration: new FormControl('', [Validators.required]),
      cat: [[], Validators.required]
    })

    this.id=this.activateRoute.snapshot.params['id'];
    if (this.id){
      this.testService.getById(this.id).subscribe(
        data=>{
          this.addForm.patchValue(data);
        }
      )
    }



    this.settings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      enableSearchFilter:true,
      classes: "myclass custom-class-example",

    };
    this.categorieService.getAllCategorie().subscribe(
      data=>{
        this.dropdownList =data.map((cat:Categorie)=>{
          return{id:cat.id, itemName:cat.name};
        })
      }
    )
 }
    affecter(){

      if(this.addForm.valid){
        this.testService.affectCategorie(this.addForm.value).subscribe(
          data=>{
            alert("ajout")


          },err=>{
            console.log(err);
          }
        )

      }

    }

  get Formvalidate(){
   return this.addForm.controls;
  }


  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
}

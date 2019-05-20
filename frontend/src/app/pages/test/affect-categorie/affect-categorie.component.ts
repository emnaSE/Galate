import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategorieService} from "../../dashboard/categorie.service";
import {Categorie} from "../../dashboard/categorie.model";
import {TestService} from "../test.service";
import {ActivatedRoute, Router} from "@angular/router";

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
              private activateRoute:ActivatedRoute,
              private router :Router) {



  }

  ngOnInit() {
    this.addForm=this.formBuilder.group({
      categories: [[], Validators.required]
    })

    this.categorieService.getAllCategorie().subscribe(
      data=>{
        this.dropdownList =data.map((cat:Categorie)=>{
          return{id:cat.id, itemName:cat.name};
        })
      }
    )

    this.id=this.activateRoute.snapshot.params['id'];
    if (this.id){
      this.testService.getById(this.id).subscribe(
        data=>{
          this.addForm.patchValue(data);
          this.selectedItems = this.dropdownList.filter(
            c =>{
              console.log("message");
              return c.id == data.categories;
            })
        },err=>{
          console.log(err)
        }
      )
    }



    this.settings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText:'Tout sélectionner',
      unSelectAllText: 'Tout déselectionner',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      enableSearchFilter:true,
      classes: "myclass custom-class-example",

    };

 }
    affecter(){
      let data={... this.addForm.value};
      data.categories=data.categories.map(
        c=>{
          return c.id ;
          console.log(c.id);
        }
      )
      if(this.addForm.valid){
        this.testService.affectCategorie(this.id,data).subscribe(
          data=>{
            alert("affectation categorie avec succes");
            this.router.navigate(['pages/test'])


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

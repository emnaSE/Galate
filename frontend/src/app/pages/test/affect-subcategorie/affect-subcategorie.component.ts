import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategorieService} from "../../dashboard/categorie.service";
import {Categorie} from "../../dashboard/categorie.model";
import {SubcategorieService} from "../../subcategorie/subcategorie.service";
import {SousCategorie} from "../../subcategorie/subcategorie.model";
import {TestService} from "../test.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'affect-subcategorie',
  templateUrl: './affect-subcategorie.component.html',
  styleUrls: ['./affect-subcategorie.component.scss']
})
export class AffectSubcategorieComponent implements OnInit {


  dropdownList = [];
  selectedItems = [];
  settings = {};
  addForm:FormGroup;
  submitted = false;
  id:number;



  constructor(private subCategorieService:SubcategorieService,
              private formBuilder:FormBuilder,
              private testService:TestService,
              private router:Router,
              private activateRoute :ActivatedRoute,

              ) {

    this.id=this.activateRoute.snapshot.params['id'];



  }

  ngOnInit() {
    this.addForm=this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      dateActivation: new FormControl('', [Validators.required]),
      dateExpiration: new FormControl('', [Validators.required]),
      scat: [[], Validators.required]
    })



    this.settings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      enableSearchFilter:true,
      classes: "myclass custom-class-example"
    };
    this.subCategorieService.getAllSousCategorie().subscribe(
      data=>{
        this.dropdownList =data.map((scat:SousCategorie)=>{
          return{id:scat.id, itemName:scat.name};
        })
      }
    )
    this.testService.getAllSubcategoriesByTestId(this.id).subscribe(
      (value:any)=>{
        this.addForm.patchValue(value);
        this.selectedItems=this.dropdownList.filter(
          c=>{
            return c.id==value.scat;

          },err=>{
            console.log(err);
          }
        )
      }
    )



  }


  get Formvalidate(){
    return this.addForm.controls;
  }

 affecter(){
    let data={... this.addForm.value}
    data.scat=data.scat.map(c=>{
      return c.id;
    })
   if (this.addForm.valid){
     this.testService.affectCategorie(this.id,data).subscribe(
       data=>{
         alert ("add avec succes");
         this.router.navigate(["pages/test"])
       },err=>{
         console.log(err)
       }
     )
   }

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

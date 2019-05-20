import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategorieService} from "../../dashboard/categorie.service";
import {Categorie} from "../../dashboard/categorie.model";
import {SubcategorieService} from "../../subcategorie/subcategorie.service";
import {SousCategorie} from "../../subcategorie/subcategorie.model";
import {TestService} from "../test.service";
import {Router} from "@angular/router";

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



  constructor(private subCategorieService:SubcategorieService,
              private formBuilder:FormBuilder,
              private testService:TestService,
              private router:Router,
              ) {



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
  }


  get Formvalidate(){
    return this.addForm.controls;
  }

onSubmit(){

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

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategorieService} from "../../dashboard/categorie.service";
import {Categorie} from "../../dashboard/categorie.model";

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

  constructor(private subCategorieService:CategorieService,
              private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.addForm=this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      dateActivation: new FormControl('', [Validators.required]),
      dateExpiration: new FormControl('', [Validators.required]),
      cat: [[], Validators.required]
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
    this.subCategorieService.getAllCategorie().subscribe(
      data=>{
        this.dropdownList =data.map((cat:Categorie)=>{
          return{id:cat.id, itemName:cat.name};
        })
      }
    )
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

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder,AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategorieService} from "../../dashboard/categorie.service";
import {SubcategorieService} from "../subcategorie.service";
import {Categorie} from "../../dashboard/categorie.model";
import {SousCategorie} from "../subcategorie.model";


@Component({
  selector: 'create-commercial',
  templateUrl: './create-sous.component.html',
  styleUrls: ['./create-sous.component.scss']
})
export class CreateSousComponent implements OnInit {
  private subcategories:SousCategorie[]
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  addForm:FormGroup;
  submitted = false;
  constructor(private categorieService:CategorieService,
              private subCategorie:SubcategorieService,
              private router:Router,
              private formBuilder:FormBuilder){

  }

  ngOnInit() {
    this.addForm=this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      cat: [[], Validators.required]

    });


    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };


    this.categorieService.getAllCategorie().subscribe(
      data=>{
        this.dropdownList =data.map((cat:Categorie)=>{
          return{id:cat.id, itemName:cat.name};
        })
      }
    )

  }

  get formvalidate() {
    return this.addForm.controls;
  }

  onSubmit(){

    this.submitted = true;


    this.subCategorie.addSousCategorie(this.addForm.value).subscribe(
      data=>{
        alert("ajouter vec succes");
        this.router.navigate(['pages/sous'])

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

}

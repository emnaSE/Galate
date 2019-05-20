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
  categories:Categorie[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  id:number;
  editMode=false;
  addForm:FormGroup;
  submitted = false;
  constructor(private categorieService:CategorieService,
              private subCategorieService:SubcategorieService,
              private router:Router,
              private formBuilder:FormBuilder,
              private activatedRoute:ActivatedRoute){
    this.id=this.activatedRoute.snapshot.params['id'];

  }

  ngOnInit() {
    this.addForm=this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      down_description: [[], Validators.required],
      up_description: [[], Validators.required],
      id_category: [[], Validators.required],


    });

    this.categorieService.getAllCategorie().subscribe(
      data=>{
        this.dropdownList =data.map((cat:Categorie)=>{
          return{id:cat.id, itemName:cat.name};

        })
      }
    )


    if(this.id){
      this.editMode=true;
      this.subCategorieService.getSousCategorieById(this.id).subscribe(
        (value:any)=>{
          this.addForm.patchValue(value);
         // let data={...this.addForm.value}
          console.log(value);
          console.log(this.selectedItems)
          console.log(this.dropdownList)
          this.selectedItems = this.dropdownList.filter(
            c =>{
              console.log("message");
             return c.id == value.id_category;
               })
        },err=>{
          console.log(err)
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
      enableSearchFilter:true,
    };



  }

  get formvalidate() {
    return this.addForm.controls;
  }

  onSubmit(){

    this.submitted = true;
    let data = {...this.addForm.value}
    console.log(data);
    data.id_category=data.id_category.map(c=>{

      return c.id;
      console.log(c.id);
    })
    if (this.id) {
      if (this.addForm.valid) {
        this.subCategorieService.updateSousCategorie(this.id, data).subscribe(
          data => {
            alert("update with succes");
            this.router.navigate(['pages/sous'])
          }, err => {
            console.log(err)
          }
        )
      }
    }else{
        if(this.addForm.valid){
          console.log("message");
          this.subCategorieService.addSousCategorie(data).subscribe(
            data=>{
              alert("ajouter vec succes");
              this.router.navigate(['pages/sous'])

            },err=>{
              console.log(err);
            }
          )

        }
      }





  }
  onItemSelect(item: any) {

    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}

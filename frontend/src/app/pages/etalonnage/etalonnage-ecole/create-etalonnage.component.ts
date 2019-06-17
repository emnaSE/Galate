import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder,AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {EtalonnageService} from "../etalonnage.service";
import {SubcategorieService} from "../../subcategorie/subcategorie.service";
import {SousCategorie} from "../../subcategorie/subcategorie.model";



@Component({
  selector: 'create-commercial',
  templateUrl: './create-etalonnage.component.html',
  styleUrls: ['./create-etalonnage.component.scss']
})
export class CreateEtalonnageComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  id:number;
  editMode=false;
  dropdownSettings = {};
  addForm:FormGroup;
  submitted = false;
  constructor(private router:Router,
              private formBuilder:FormBuilder,
              private activateRouter:ActivatedRoute,
              private etalonnageService:EtalonnageService,
              private sousCategorie:SubcategorieService){

    this.id = this.activateRouter.snapshot.params['id'];
  }

  ngOnInit() {
    this.addForm=this.formBuilder.group({
      lower_bound: ['', Validators.required],
      upper_bound: ['', Validators.required],
      value: ['', Validators.required],
      id_subcategory: ['', Validators.required],

    });

 this.sousCategorie.getAllSousCategorie().subscribe(
      data=>{
        this.dropdownList =data.map((id_subcategory:SousCategorie)=>{
          return{id:id_subcategory.id, itemName:id_subcategory.name};
        })
      }
    )
    if(this.id){
      this.editMode=true;
      this.etalonnageService.getById(this.id).subscribe(
        (value:any)=>{
          this.addForm.patchValue(value);
          this.selectedItems = this.dropdownList.filter(
            c =>{
              console.log("message");
              return c.id == value.id_subcategory;
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
      classes: "myclass custom-class-example"
    };



  }

  get formvalidate(){
    return this.addForm.controls;
  }
  onSubmit(){
    this.submitted = true;
    let data={... this.addForm.value}
    data.id_subcategory=data.id_subcategory.map(c=>{
      return c.id;
    });
    if (this.id){
      if (this.addForm.valid){
        this.etalonnageService.updateEtalonnage(this.id, data).subscribe(
          data=>{
            alert("Modification avec succes");
            this.router.navigate(['pages/etalonnage']);
          },err=>{
            console.log(err)
          }
        )
      }

    }else
      if(this.addForm.valid){
        this.etalonnageService.addEtalongae(data).subscribe(
          data=>{
            alert("Ajout avec succes");
            this.router.navigate(['pages/etalonnage']);
          },err=>{
            console.log(err);
          }
        )
      }
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


}

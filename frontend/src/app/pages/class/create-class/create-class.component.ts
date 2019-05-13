import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder,AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClassService} from "../class.service";
import {EcoleService} from "../../ecole/ecole.service";


@Component({
  selector: 'create-commercial',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.scss']
})
export class CreateClassComponent implements OnInit {

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  addForm:FormGroup;
  submitted = false;
  constructor(private router:Router,
              private formBuilder:FormBuilder,
              private ecoleService:EcoleService,
              private classService:ClassService){

  }

  ngOnInit() {
    this.addForm=this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      ecole: [[], Validators.required]

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
/*
ajouter service get all ecole
  this.ecoleService.getAllEcole().subscribe(
      data=>{
        this.dropdownList =data.map((ecole:Ecole)=>{
          return{id:ecole.id, itemName:ecole.name};
        })
      }
    )
* */

  }
  get formvalidate() {
    return this.addForm.controls;
  }

  onSubmit(){
    this.submitted=true;

  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }



}

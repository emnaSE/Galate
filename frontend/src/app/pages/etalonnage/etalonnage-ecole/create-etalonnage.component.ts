import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder,AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'create-commercial',
  templateUrl: './create-etalonnage.component.html',
  styleUrls: ['./create-etalonnage.component.scss']
})
export class CreateEtalonnageComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  addForm:FormGroup;
  submitted = false;
  constructor(private router:Router,
              private formBuilder:FormBuilder){

  }

  ngOnInit() {
    this.addForm=this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      lowerBound: [[], Validators.required],
      upperBound: [[], Validators.required],
      value: [[], Validators.required],
      scat: [[], Validators.required],

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

    this.sousCategorie.getAllSousCategorie().subscribe(
      data=>{
        this.dropdownList =data.map((scat:SousCategorie)=>{
          return{id:scat.id, itemName:scat.name};
        })
      }
    )
     */


  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


}

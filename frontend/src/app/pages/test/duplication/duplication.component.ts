import { Component, OnInit } from '@angular/core';
import {TestService} from "../test.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Test} from "../test.model";
import {Ecole} from "../../ecole/ecole.model";

@Component({
  selector: 'duplication',
  templateUrl: './duplication.component.html',
  styleUrls: ['./duplication.component.scss']
})
export class DuplicationComponent implements OnInit {
  dropdownList = [];
  tests:Test[];
  selectedItems = [];
  dropdownSettings = {};
  addForm:FormGroup;
  constructor(private testService:TestService,
              private router: Router,
              private formBuilder:FormBuilder) { }

  ngOnInit() {

    this.addForm=this.formBuilder.group({
      name: new FormControl('',[Validators.required]),
      id_test:[[], Validators.required]
    });

    this.testService.getAllTest().subscribe(
      data=>{
        this.dropdownList =data.map((test:Test)=>{
          return{id:test.id, itemName:test.name};
        })
      }
    )
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      searchPlaceholderText: 'chercher',
      filterSelectAllText: 'Sélectionner tous les résultats filtrés',
      selectAllText: 'Tout sélectionner',
      unSelectAllText: 'Tout déselectionner',
      noDataLabel: 'Pas de données disponibles',
      text:"choisissez un test",

      itemsShowLimit: 1,
      allowSearchFilter: true,
      enableSearchFilter:true
    };
  }
  get formvalidate() {
    return this.addForm.controls;
  }
  onSubmit(){
    let data = {...this.addForm.value}
    console.log(data);
    data.id_test=data.id_test.map(t=>{

      return t.id;

    })
    if (this.addForm.valid){
      this.testService.duplicateTest(data).subscribe(
        data=>{
          alert("succes")
          this.router.navigate(['pages/test']);
        },err=>{
          console.log(err);
        }
      )
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

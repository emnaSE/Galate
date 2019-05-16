import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder,AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClassService} from "../class.service";
import {EcoleService} from "../../ecole/ecole.service";
import {Ecole} from "../../ecole/ecole.model";


@Component({
  selector: 'create-commercial',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.scss']
})
export class CreateClassComponent implements OnInit {
  private ecoles:Ecole[]
  dropdownList = [];
  id:number;
  editMode=false;
  selectedItems = [];
  dropdownSettings = {};

  addForm:FormGroup;
  submitted = false;
  constructor(private router:Router,
              private formBuilder:FormBuilder,
              private ecoleService:EcoleService,
              private classService:ClassService,
              private activatedRouter:ActivatedRoute){
this.id = this.activatedRouter.snapshot.params['id'];
  }

  ngOnInit() {
    this.addForm=this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      id_ecole: [[], Validators.required]

    });

    if(this.id){
      this.editMode=true;
      this.classService.getClassById(this.id).subscribe(
        (value:any)=>{
          this.addForm.patchValue(value);
        },err=>{
          console.log(err);
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
      enableSearchFilter:true
    };


  this.ecoleService.getAllEcole().subscribe(
      data=>{
        this.dropdownList =data.map((ecole:Ecole)=>{
          return{id:ecole.id, itemName:ecole.name};
        })
      }
    )


  }
  get formvalidate() {
    return this.addForm.controls;
  }

  onSubmit(){

    this.submitted = true;
    let data = {...this.addForm.value}
    console.log(data);
    data.id_ecole=data.id_ecole.map(e=>{

      return e.id;

    })
    if (this.id) {
      if (this.addForm.valid) {
        this.classService.updateClass(this.id, data).subscribe(
          data => {
            alert("update with succes");
            this.router.navigate(['pages/class'])
          }, err => {
            console.log(err)
          }
        )
      }
    }else{
      if(this.addForm.valid){

        this.classService.addClass(data).subscribe(
          data=>{
            alert("ajouter vec succes");
            this.router.navigate(['pages/class'])

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

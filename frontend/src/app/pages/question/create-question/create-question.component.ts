import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder,AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'create-commercial',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {

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
  onSubmit(){
    this.submitted = true;
    console.log("workk")
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder,AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {TestService} from "../test.service";

@Component({
  selector: 'create-commercial',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {

  id:number;
  submitted = false;
  editMode=false;
  erreur:number;
  addForm:FormGroup;
  constructor(private testService:TestService,
              private activateRouter:ActivatedRoute,
              private formBuilder:FormBuilder,
              private router:Router){

    this.id = this.activateRouter.snapshot.params['id'];

  }
  ngOnInit() {

    this.addForm=this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      down_description: [[], Validators.required],
      up_description: [[], Validators.required],
      id_category: [[], Validators.required],
      activation_date: [[], Validators.required],
      expiration_date: [[], Validators.required],
      password: [[], Validators.required],
    });

    if(this.id){
      this.editMode=true;
      this.testService.getById(this.id).subscribe(
        (value:any)=>{
          this.addForm.patchValue(value);
        },err=>{
          console.log(err);
        }
      )
    }

  }

  onSubmit(){
    this.submitted=true;
    if(this.id){
      if(this.addForm.valid){
        this.testService.updateTest(this.id,this.addForm.value).subscribe(
          data=>{
            alert("update avec succes");
            this.router.navigate(['pages/test'])
          }
        )
      }
    }else{
      if(this.addForm.valid){
        this.testService.addTest(this.addForm.value).subscribe(
          data=>{
            alert("succes");
            this.router.navigate(['pages/test'])
          },err=>{
            console.log(err)
          }
        )
      }
    }
  }



}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder,AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {EcoleService} from "../ecole.service";


@Component({
  selector: 'create-commercial',
  templateUrl: './create-ecole.component.html',
  styleUrls: ['./create-ecole.component.scss']
})
export class CreateEcoleComponent implements OnInit {

  id:any;
  editMode=false;
  addForm:FormGroup;
  submitted = false;
  constructor(private router:Router,
              private formBuilder:FormBuilder,
              private ecoleService:EcoleService,
              private activateRouter:ActivatedRoute){
    this.id = this.activateRouter.snapshot.params['id'];


  }

  ngOnInit() {


    this.addForm=this.formBuilder.group({
      name: new FormControl('', [Validators.required]),



    });

    if(this.id){

      this.editMode=true;
      this.ecoleService.getEcoleById(this.id).subscribe(
        (value:any)=>{
          this.addForm.patchValue(value);
        },err=>{
          console.log(err)
        }
      )
    }







  }
  get formValidate(){
    return this.addForm.controls;
  }

  onSubmit(){
    this.submitted=true;
    //this.editMode=true;
    if(this.id){
      if(this.addForm.valid){
        this.ecoleService.updateEcole(this.id, this.addForm.value).subscribe(
          data=>{
            alert("modifiée avec succès ")
            this.router.navigate(['pages/ecole'])
          }
        )
      }
    }else{
      if(this.addForm.valid){
        this.ecoleService.addEcole(this.addForm.value).subscribe(
          data=>{
            alert("ajouter avec succes")
            this.router.navigate(['pages/ecole'])
          },err=>{
            console.log(err);
          }
        )
      }
    }

  }
}


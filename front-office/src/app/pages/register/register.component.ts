import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegisterService } from './register.service';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
})
export class RegisterComponent  implements OnInit{

  id:any;
  editMode=false;
  addForm:FormGroup;
  submitted = false;
  constructor(private router:Router,
              private registerService:RegisterService,
              private formBuilder:FormBuilder,
              private activateRouter:ActivatedRoute){


  }

  ngOnInit() {
    this.id = this.activateRouter.snapshot.params['id'];
    if(this.id){

      this.editMode=true;
      
    }

    this.addForm=this.formBuilder.group({
      name: new FormControl('', [Validators.required]),


    });





  }
  get formValidate(){
    return this.addForm.controls;
  }

  onSubmit(){
    this.submitted=true;
    //this.editMode=true;
    
      if(this.addForm.valid){
        this.registerService.addMember(this.addForm.value).subscribe(
          data=>{
            alert("ajouter avec succes")
            this.router.navigate(['pages/register'])
          },err=>{
            console.log(err);
          }
        )
      }
    }

  }
  


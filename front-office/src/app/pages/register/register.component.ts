import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators  } from '@angular/forms';
import { RegisterService } from './register.service';
import { Register } from './register.model';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
})
export class RegisterComponent  implements OnInit{
  private register:Register[]
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  addForm:FormGroup;
  submitted = false;
  constructor(private router:Router,
              private registerService:RegisterService,
              private formBuilder:FormBuilder,
              private activateRouter:ActivatedRoute){

              


  }

  ngOnInit() {
    
  
    this.addForm=this.formBuilder.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      pseudo: new FormControl('', [Validators.required]),
      civility: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      id_clazz: new FormControl('', [Validators.required]),
      id_school: new FormControl('', [Validators.required]),
     


    });

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      enableSearchFilter:true,
      classes: "myclass custom-class-example",
    };


    

   }
  get formValidate(){
    return this.addForm.controls;
  }

  onSubmit(){
    console.log("----------------------------- add member")
    this.submitted=true;
    if(this.addForm.valid){
      console.log(this.addForm.value)
        this.registerService.addMember(this.addForm.value).subscribe(
          data=>{
            alert("ajouter avec succes")
            this.router.navigate(['pages/login'])
          },err=>{
            console.log(err);
          }
        )
      }
    }

  }
  


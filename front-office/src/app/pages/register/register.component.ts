import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators  } from '@angular/forms';
import { RegisterService } from './register.service';
import { Register } from './register.model';
import {Clazz} from './clazz.model';
import { School } from './school.model';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
})
export class RegisterComponent  implements OnInit{
  private register:Register[]
  dropdownList = [];
  dropdownList1 = [];
  selectedItems1 = [];
  selectedItems = [];
  dropdownSettings1 = {};
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
      id_clazz: [[], Validators.required],
      id_school: [[], Validators.required],
     


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

    this.dropdownSettings1 = {
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

    this.registerService.getAllClazz().subscribe(
      data=>{
        this.dropdownList1=data.map((clazz:Clazz)=>{
          return{id:clazz.id, itemName:clazz.name};
        })
      }
    )

    this.registerService.getAllSchool().subscribe(
      data=>{
        this.dropdownList=data.map((school:School)=>{
          return{id:school.id, itemName:school.name};
        })
      }
    )


 

    

  }
  get formValidate(){
    return this.addForm.controls;
  }

  onSubmit(){
    console.log("----------------------------- add member")
    this.submitted=true;
    let data = {...this.addForm.value}
    
    data.id_clazz=data.id_clazz.map(c=>{
      return c.id
    })
    data.id_school=data.id_school.map(s=>{
      return s.id
    })
    if(this.addForm.valid){
      console.log(data)
        this.registerService.addMember(data).subscribe(
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
  


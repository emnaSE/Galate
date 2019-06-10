
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators  } from '@angular/forms';
import { RegisterService } from './register.service';
import { Register } from './register.model';
import {Clazz} from './clazz.model';
import { School } from './school.model';
import { map } from 'rxjs-compat/operator/map';
import { element } from '@angular/core/src/render3';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
})
export class RegisterComponent  implements OnInit{
  private register:Register[]
  err:number;
  private map:Map<number,string>=new Map();
  dropdownList = [];
  dropdownList1 = [];
  dropdownList0 = [];
  selectedItems1 = [];
  selectedItems = [];
  selectedItems0 = [];
  dropdownSettings1 = {};
  dropdownSettings = {};
  dropdownSettings0 = {};
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
      //password: new FormControl('', [Validators.required]),
      //pseudo: new FormControl('', [Validators.required]),
      //civility: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      id_clazz: [[], Validators.required],
      id_school: [[], Validators.required],
      checked: new FormControl('',[Validators.required]),
      //study_level: new FormControl('', [Validators.required]),
      sexe: [[],[Validators.required]],

      city: new FormControl('', [Validators.required]),

    });
    this.dropdownSettings0 = {
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

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      text:"Veuillez faire votre choix",
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
      text:"Veuillez faire votre choix",
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
    console.log(this.addForm.value)

    //console.log("----------------------------- add member")
    this.submitted=true;
    let registration = {...this.addForm.value}
    
    registration.id_clazz=registration.id_clazz.map(c=>{
      return c.id
    })
    registration.id_school=registration.id_school.map(s=>{
      return s.id
    })
    if(this.addForm.valid){
      console.log(registration)
        this.registerService.addMember(registration).subscribe(
          data=>{
            localStorage.setItem('memberId', JSON.parse(JSON.stringify(data)).memberId);
            //alert("ajouter avec succes")
            //this.router.navigate(['/login'])
            this.router.navigate(['/test'])
          },err=>{
            console.log(err);
          }
        )
      }else{
      alert("merci de verifier vos données");
        this.err=5;
      }
    }



  }
  


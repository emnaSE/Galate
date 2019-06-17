import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder,AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {TestService} from "../test.service";
import {Test} from "../test.model";

@Component({
  selector: 'create-commercial',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {
  dateActivation:Date;
  dateFin:Date;
  date_ereur:number;
  p_error:number;
  id:number;
  local:any;
  err=1;
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
  dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: "La date d 'activation  doit être inférieure à la date expiration"
        };
      }
      return {};
    }
  }

  ngOnInit() {

    this.addForm=this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      activation_date: [[], Validators.required],
      expiration_date: [[], Validators.required],
      test_subcategories_number: [, Validators.required],
      duration: ['', Validators.required],
      password: [[], Validators.required],
    },{validator: this.dateLessThan('activation_date','expiration_date')});



    if(this.id){
      this.editMode=true;
      this.testService.getById(this.id).subscribe(
        (value:any)=>{
          this.addForm.patchValue(value);
          localStorage.setItem('currentTest', JSON.stringify(value));
        },err=>{
          console.log(err);
        }
      )
    }

  }
  get valid(){
    return this.addForm.controls;
  }


  onSubmit(){
    this.submitted=true;

    if(this.id){
      console.log(this.addForm.value)
      console.log(this.valid.activation_date.value);
      console.log(this.valid.expiration_date.value);
      if(this.addForm.valid){
        console.log(this.valid.activation_date.value);
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



consultezCategorie(){

    this.router.navigate(['pages/categorie']);
    }
  consultezSubCategorie(){

      this.router.navigate(['pages/sous/',this.id]);

    }

    consulterCategorie(){

    this.router.navigate(['pages/categorie/',this.id]);
    }

    duplication(){
    this.router.navigate(['']);
    }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder,AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategorieService} from "../categorie.service";
import {Categorie} from "../categorie.model";



@Component({
  selector: 'create-commercial',
  templateUrl: './create-categorie.component.html',
  styleUrls: ['./create-categorie.component.scss']
})
export class CreateCategorieComponent implements OnInit {
  private categorie:Categorie[]
  id:number;
  editMode=false;
  addForm:FormGroup;
  submitted = false;
  err:number;

  constructor(private categorieService:CategorieService,
              private formBuilder:FormBuilder,
              private activateRoute:ActivatedRoute,
              private router:Router){










  }

  ngOnInit() {

    this.addForm=this.formBuilder.group({
      name: new FormControl('', Validators.required),
      subcategories_number: ['', Validators.required],

    });


    this.id=this.activateRoute.snapshot.params['id'];
    if(this.id){
      this.editMode=true;
      this.categorieService.getCategorieParId(this.id).subscribe(
        (value:any)=>{
          this.addForm.patchValue(value);


        },err=>{
          console.log(err);
        }
      )
    }







  }





  get formvalidate() {
    return this.addForm.controls;
  }
  onSubmit(){
    this.submitted=true;
    //this.editMode=true;
    if(this.id){
      if(this.addForm.valid){
        this.categorieService.updateCategorie(this.id, this.addForm.value).subscribe(
          data=>{
            this.err= 1;
            this.router.navigate(['pages/categorie'])
          }
        )
      }
    }else{
      if(this.addForm.valid){
        this.categorieService.addCategorie(this.addForm.value).subscribe(
          data=>{
            this.err=2;
            this.router.navigate(['pages/categorie'])
          }
        )
      }
    }

  }
}

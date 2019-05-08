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
  addForm:FormGroup;
  submitted = false;

  constructor(private categorieService:CategorieService,
              private formBuilder:FormBuilder,
              private router:Router){

  }

  ngOnInit() {

    this.addForm=this.formBuilder.group({
      nom: new FormControl('', [Validators.required]),
      subCategoriesNumber: ['',Validators.required],
     });




  }
  get formvalidate() {
    return this.addForm.controls;
  }
  onSubmit(){
    this.submitted = true;
    this.categorieService.addCategorie(this.addForm.value).subscribe(
      data=>{
        alert("ajouter vec succes");
        this.router.navigate(['pages/dashboard'])

      },err=>{
        console.log(err);
      }
    )


  }


}

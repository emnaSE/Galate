import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder,AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategorieService} from "../../dashboard/categorie.service";
import {CriterionService} from "../criterion.service";
import {Categorie} from "../../dashboard/categorie.model";
import {Criterion} from "../criterion.model";
import { SousCategorie } from '../../subcategorie/subcategorie.model';
import { SubcategorieService } from '../../subcategorie/subcategorie.service';


@Component({
  selector: 'create-commercial',
  templateUrl: './create-criterion.component.html',
  styleUrls: ['./create-criterion.component.scss']
})
export class CreateCriterionComponent implements OnInit {

  id:number;
  editMode=false;
  addForm:FormGroup;
  submitted = false;
  constructor(private categorieService:CategorieService,
              private criterionService:CriterionService,
              private router:Router,
              private formBuilder:FormBuilder,
              private activatedRoute:ActivatedRoute){
    this.id=this.activatedRoute.snapshot.params['id'];

  }

  ngOnInit() {
    this.addForm=this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
    });

    if(this.id){
      this.editMode=true;
      this.criterionService.getCriterionById(this.id).subscribe(
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

    this.submitted = true;
    let data = {...this.addForm.value}
    console.log(data);
    
    if (this.id) {
      if (this.addForm.valid) {
        this.criterionService.updateCriterion(this.id, data).subscribe(
          data => {
            console.log("update==> "+data);
            alert("modification avec succès");
            this.router.navigate(['pages/criterion'])
          }, err => {
            console.log(err)
          }
        )
      }else{
        alert("vérifier données entrées");
      }
    }else{
        if(this.addForm.valid){
          console.log("create==> "+data);
          this.criterionService.createCriterion(data).subscribe(
            data=>{
              alert("ajout avec succès");
              this.router.navigate(['pages/criterion'])

            },err=>{
              console.log(err);
            }
          )

        }else{
          alert("vérifier données entrées");
        }
      }





  }



  

  create(){
    this.router.navigate(['pages/criterion/create',this.id]);

  }


}

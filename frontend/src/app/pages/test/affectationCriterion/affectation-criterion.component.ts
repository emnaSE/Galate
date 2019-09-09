import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategorieService} from "../../dashboard/categorie.service";
import {Categorie} from "../../dashboard/categorie.model";
import {SubcategorieService} from "../../subcategorie/subcategorie.service";
import {SousCategorie} from "../../subcategorie/subcategorie.model";
import {TestService} from "../test.service";
import {ActivatedRoute, Router} from "@angular/router";
import { CriterionService } from '../../criterion/criterion.service';
import { Criterion } from '../../criterion/criterion.model';

@Component({
  selector: 'affectation-criterion',
  templateUrl: './affectation-criterion.component.html',
  styleUrls: ['./affectation-criterion.component.scss']
})
export class AffectCriterionComponent implements OnInit {


  dropdownList = [];
  selectedItems = [];
  onDeSelect =[];
  settings = {};
  addForm:FormGroup;
  submitted = false;
  id:number;



  constructor(private subCategorieService:SubcategorieService,
              private criterionService:CriterionService,
              private formBuilder:FormBuilder,
              private testService:TestService,
              private router:Router,
              private activateRoute :ActivatedRoute,

              ) {

    this.id=this.activateRoute.snapshot.params['id'];



  }

  ngOnInit() {
    this.addForm=this.formBuilder.group({
      criterions: [[], Validators.required],
      unselect:[[]],

    })

  

    this.criterionService.getAllCriterions().subscribe(
      data=>{
        this.dropdownList =data.map((cri:Criterion)=>{
          return{id:cri.id, itemName:cri.name};
        })
      }
    )

    if(this.id){

      this.testService.getCriterionsByTestId(this.id).subscribe(
        (value:any)=>{
          this.addForm.patchValue(value);

          this.selectedItems = this.dropdownList.filter(
            c =>{
              return value.map(v=> v.id).includes(c.id)
            });

        },err=>{
          console.log(err)
        }
      )
    }




    this.settings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      enableSearchFilter:true,
      classes: "myclass custom-class-example"
    };


  }


  get Formvalidate(){
    return this.addForm.controls;
  }

 affecter(){

    let data={... this.addForm.value};
    data.criterions=data.criterions.map(
     c=>{
       return c.id ;
       console.log(c.id);
     }
   )

   if (this.addForm.valid){
     console.log(this.OnItemDeSelect);
     this.testService.AssignCriterions(this.id,data).subscribe(
       data=>{
         alert ("add avec succes");
         this.router.navigate(['pages/test/',this.id,'ordre'])
       },err=>{
         console.log(err)
       }
     )
   }

 }


  onItemSelect(event) {
    console.log(event.id);
    this.testService.assignCriterionToTest(this.id,event.id).subscribe(
      data=>{
        if(data==='success'){
          alert("ajout avec sucess");
        }else{
          alert('désolé un problème est survenu. veuillez réessayer plus tard.');
        }
      },err=>{
        alert("erreur"+err);
      }
    )
    //console.log(this.selectedItems);
  }
  OnItemDeSelect(event: any) {
    //console.log(event.id);
    this.testService.unassignCriterionToTest(this.id,event.id).subscribe(
      data=>{
        //console.log(data);

        if(data==='success'){

          alert("suppression avec succès");
        }else{
          alert("Vous ne pouvez pas supprimer cette sous categorie");
          this.testService.getCriterionsByTestId(this.id).subscribe(
            (value:any)=>{
              this.addForm.patchValue(value);

              this.selectedItems = this.dropdownList.filter(
                c =>{
                  return value.map(v=> v.id).includes(c.id)
                });

            },err=>{
              console.log(err)
            }
          )
        }

      },err=>{
        //console.log(err);
        alert("Vous ne pouvez pas supprimer cette sous categorie");

    }
    )
    console.log(event.id);
  }




  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(event) {
    console.log(event);
  }
  getTestCriterion(){

    this.router.navigate(['pages/test/',this.id,'testCriterion'])

  }
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SousCategorie} from "../../subcategorie/subcategorie.model";
import {TestService} from "../../test/test.service";
import {ActivatedRoute, Router} from "@angular/router";
import { CriterionService } from '../../criterion/criterion.service';

@Component({
  selector: 'affect-criterions',
  templateUrl: './affect-criterions.component.html',
  styleUrls: ['./affect-criterions.component.scss']
})
export class AffectCriterionsComponent implements OnInit {


  dropdownList = [];
  selectedItems = [];
  onDeSelect =[];
  settings = {};
  addForm:FormGroup;
  submitted = false;
  id:number;
  testId:number;



  constructor(private criterionService:CriterionService,
              private formBuilder:FormBuilder,
              private testService:TestService,
              private router:Router,
              private activateRoute :ActivatedRoute,

              ) {

    this.id=this.activateRoute.snapshot.params['id'];



  }

  ngOnInit() {
    var test=JSON.parse(localStorage.getItem("currentTest"));
    this.testId=test.id;

    this.addForm=this.formBuilder.group({
      subcategories: [[], Validators.required],
      unselect:[[]],

    })

    this.criterionService.getAllCriterions().subscribe(
      data=>{
        this.dropdownList =data.map((criterion:SousCategorie)=>{
          return{id:criterion.id, itemName:criterion.name};
        })
      }
    )

    if(this.id){
      this.criterionService.getCriterionsByTestCategoryId(this.testId,this.id).subscribe(
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
    data.subcategories=data.subcategories.map(
     c=>{
       return c.id ;
       console.log(c.id);
     }
   )

   if (this.addForm.valid){
     console.log(this.OnItemDeSelect);
     this.testService.affectSubCategorie(this.id,data).subscribe(
       data=>{
         alert ("add avec succes");
         this.router.navigate(['pages/test/',this.id,'ordre'])
         //this.router.navigate(["pages/test"])
       },err=>{
         console.log(err)
       }
     )
   }

 }


  onItemSelect(event) {
    console.log(event.id);
    this.criterionService.assignCriterionTOTestCategory(this.testId, this.id, event.id).subscribe(
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
    this.criterionService.unassignCriterionToTestCategory(this.testId, this.id, event.id).subscribe(
      data=>{
        if(data==='success'){
          alert("suppression avec succès");
        }else{
          alert("Vous ne pouvez pas supprimer cette sous categorie");
          this.testService.getAffectationById(this.id).subscribe(
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
  addCriterionOrder(){
    this.router.navigate(['pages/category',this.id,'criterionsOrder'])
  }
}

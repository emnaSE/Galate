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
  private subcategories:SousCategorie[]
  //categories:Categorie[];
  dropdownList = [];
  dropdownList1 = [];
  selectedItems1=[];
  selectedItems = [];
  dropdownSettings = {};
  dropdownSettings1 ={};

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
      id_category: [[], Validators.required],
      ordre: [[], Validators.required],
     // id_subcategories: [[], Validators.required],
      


    });

    this.criterionService.getAllCategories().subscribe(
      data=>{
        this.dropdownList =data.map((cat:Categorie)=>{
          return{id:cat.id, itemName:cat.name};
        

        })
        this.dropdownList1 =data.map((scat:SousCategorie)=>{
          return{id:scat.id, itemName:scat.name};
        })
      }
    )


    if(this.id){
      this.editMode=true;
      this.criterionService.getCriterionById(this.id).subscribe(
        (value:any)=>{
          this.addForm.patchValue(value);
                this.selectedItems = this.dropdownList.filter(
                  c =>{
                    return c.id == value.id_category;
                  });
        },err=>{
          console.log(err)
        }
      );

      /*this.criterionService.getAllSubcategoriesByCriterionId(this.id).subscribe(
        (value:any)=>{
          this.addForm.patchValue(value);
               this.selectedItems1=this.dropdownList1.filter(
                  s=>{
                    return value.map(v=> v.id).includes(s.id)
                  });
        },err=>{
          console.log(err)
        }
      );*/
    }

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      text:"choisissez une categorie",
      searchPlaceholderText: 'chercher',
      filterSelectAllText: 'Sélectionner tous les résultats filtrés',
      selectAllText: 'Tout sélectionner',
      unSelectAllText: 'Tout déselectionner',
      noDataLabel: 'Pas de données disponibles',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      enableSearchFilter:true,
    };
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      text:"choisissez une categorie",
      searchPlaceholderText: 'chercher',
      filterSelectAllText: 'Sélectionner tous les résultats filtrés',
      selectAllText: 'Tout sélectionner',
      unSelectAllText: 'Tout déselectionner',
      noDataLabel: 'Pas de données disponibles',
      itemsShowLimit: 12,
      allowSearchFilter: true,
      enableSearchFilter:true,
    };

  
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
  onItemSelect(item: any) {

    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


  

  create(){
    this.router.navigate(['pages/criterion/create',this.id]);

  }


}

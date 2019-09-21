import { Component, OnInit } from '@angular/core';
import {TestService} from "../../test/test.service";
import {ActivatedRoute} from "@angular/router";
import {Test} from "../../test/test.model";
import {SubcategorieService} from "../../subcategorie/subcategorie.service";
import { CriterionService } from '../../criterion/criterion.service';

@Component({
  selector: 'test-order',
  templateUrl: './criterion-order.component.html',
  styleUrls: ['./criterion-order.component.scss']
})
export class CriterionOrderComponent implements OnInit {

  id:number;
  pageActuel:number=1;
  tests:Test[];
  testId:number;
  settings = {
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave:true,
    },
    actions: {
      add: false,
      delete: false,
      filter:false,
    },
    selectMode: 'multi',
    columns: {

      name: {
        title: 'compétence',
        editable: false,
      },
      ordre: {
        title: 'ordre'
      },

    }
  };
  constructor(private criterionService:CriterionService,
              private activatedRouter:ActivatedRoute,
              private subCategorieService:SubcategorieService) {
   this.id = this.activatedRouter.snapshot.params['id'];
    console.log(this.id);
  }

  ngOnInit() {
    var test=JSON.parse(localStorage.getItem("currentTest"));
    this.testId=test.id;
    this.criterionService.getAllCriterionTestCategoryByTestAndCategoryIds(this.testId,this.id).subscribe(
      data=>{
        this.tests=data;
      },err=>{
        console.log(err)
      }
    )


  }
  onEditConfirm(event): void {

    if (window.confirm('Êtes-vous sûr de vouloir mettre à jour?')) {
      console.log(event.newData.criteriontestcatId);
        this.criterionService.updateOrder(event.newData.criteriontestcatId,event.newData.ordre).subscribe(
          data=>{
            alert("succès");
          }
        )

    } else {
      alert ("erreur");
    }

  }

}

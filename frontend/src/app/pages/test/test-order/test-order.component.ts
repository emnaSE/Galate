import { Component, OnInit } from '@angular/core';
import {TestService} from "../test.service";
import {ActivatedRoute} from "@angular/router";
import {Test} from "../test.model";
import {SubcategorieService} from "../../subcategorie/subcategorie.service";

@Component({
  selector: 'test-order',
  templateUrl: './test-order.component.html',
  styleUrls: ['./test-order.component.scss']
})
export class TestOrderComponent implements OnInit {

  id:number;
  pageActuel:number=1;
  tests:Test[];
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
        title: 'Sous categorie',
        editable: false,
      },
      ordre: {
        title: 'ordre'
      },

    }
  };
  constructor(private testService:TestService,
              private activatedRouter:ActivatedRoute,
              private subCategorieService:SubcategorieService) {
   this.id = this.activatedRouter.snapshot.params['id'];
    console.log(this.id);
  }

  ngOnInit() {

    this.subCategorieService.getAllSubCateByIdTest2(this.id).subscribe(
      data=>{
        this.tests=data;
      },err=>{
        console.log(err)
      }
    )


  }
  onEditConfirm(event): void {

    if (window.confirm('Êtes-vous sûr de vouloir mettre à jour?')) {
      console.log(event.newData.testSubcatId);
        this.testService.updateOrder(event.newData.testSubcatId,event.newData.ordre).subscribe(
          data=>{
            alert("succès");
          }
        )

    } else {
      alert ("erreur");
    }

  }

}

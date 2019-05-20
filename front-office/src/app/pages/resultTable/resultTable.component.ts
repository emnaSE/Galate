import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { ResultTable } from './resultTable.model';
import { ResultTableService } from './resultTable.service';
import { Catalogue } from './Catalogue.model';




@Component({
  selector: 'resultTable',
  templateUrl: './resultTable.component.html',
})
export class ResultTableComponent  implements OnInit{
  pageActuel: number =1;
  resultTables:ResultTable[];
  catalogues:Catalogue[];
  catalogueDetails:ResultTable[];
  id:number =1;



    constructor(private router:Router,
                private resultTableService:ResultTableService){ }
  ngOnInit() { 

   

    this.resultTableService.getAllCatrogiesByTestMember().subscribe(
      data=>{
        this.catalogueDetails=data;
        console.log(data);
      },err=>{
        console.log(err)
      }
    )


    this.resultTableService.getCategoryNameByMemberIdAndTestId().subscribe(
      data=>{
        this.catalogues=data;
        console.log(data);
      },err=>{
        console.log(err)
      }
    )


    this.resultTableService.getAllResultTable().subscribe(
      data=>{
        this.resultTables=data;
        console.log(data);
      },err=>{
        console.log(err)
      }
    )
  }

  
}

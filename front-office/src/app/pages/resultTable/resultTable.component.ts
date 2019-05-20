import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { ResultTable } from './resultTable.model';
import { ResultTableService } from './resultTable.service';




@Component({
  selector: 'resultTable',
  templateUrl: './resultTable.component.html',
})
export class ResultTableComponent  implements OnInit{
  pageActuel: number =1;
  resultTables:ResultTable[];




    constructor(private router:Router,
                private resultTableService:ResultTableService){ }
  ngOnInit() { 

    this.resultTableService.getAllSchool().subscribe(
      data=>{
        this.resultTables=data;
        console.log(data);
      },err=>{
        console.log(err)
      }
    )
  }

  
}

import {Component, OnInit, ɵConsole} from '@angular/core';
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
  catalogueDetails:any[];
  selectNumber:number;
  radioItems=[1,2,3,4,5,6,7,8,9,10,11]
  radioSel:any;
  radioSelected:string;
  radioSelectedString:string;
  _prevSelected: any;
  public items: Array<string>;

  id:number =1;
  


    constructor(private router:Router,
                private resultTableService:ResultTableService){

                  this.items = ["1", "2", "3" , "4", "5", "6" , "7", "8", "9", "10", "11"]   
                  }

                   
  ngOnInit() { 

    
  
    this.resultTableService.getAllCatrogiesByTestMember().subscribe(
      data=>{
        this.catalogueDetails=data;
        this.catalogueDetails = Array.of(this.catalogueDetails); 
      
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
  radiochangeHandler(event:any){

 

    this.selectNumber=event.traget;
    console.log(this.selectNumber)
  }
  
 

 
  public open(event, item,name , categoryName , down_description ,up_description ) {
    alert('Open ' + item + name + categoryName + down_description + up_description);
    console.log('clicked');
  }

  
}

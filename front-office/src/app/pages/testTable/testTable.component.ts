import {Component, OnInit, ɵConsole} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { TestTable } from './testTable.model';
import { TestTableService } from './testTable.service';

import { map } from 'rxjs-compat/operator/map';

import { TestService } from '../test/test.service';





@Component({
  selector: 'testTable',
  templateUrl: './testTable.component.html',
})
export class TestTableComponent  implements OnInit{
  pageActuel: number =1;
  testTables:TestTable[];
  
  catalogueDetails:any[];
  selectNumber:number;
  
  radioSel:any;
  radioSelected:string;
  radioSelectedString:string;
  _prevSelected: any;
  id: any;
  public items: Array<string>;
  public map=new Map<String, String>();
 
  public object : any ;
  memberId:any;
  testId:any;
  


    constructor(private router:Router,
                private testTableService:TestTableService,
               
                private testService:TestService , private activatedRoute:ActivatedRoute){

                  this.items = ["1", "2", "3" , "4", "5", "6" , "7", "8", "9", "10", "11"]   

                  this.testId=localStorage.getItem('testId');

                  this.memberId=localStorage.getItem('memberId');
                  
             
            
              }



  ngOnInit() {
  

    
    this.testTableService.getAllQuestionsByTestSubcategories(this.testId).subscribe(
      data=>{
        this.object=data;
        this.catalogueDetails=data;
        this.catalogueDetails = Array.of(this.catalogueDetails); 
      
        console.log(data);
      },err=>{
        console.log(err)
      }
    )


  }
  

 
  

    }

 
  

  


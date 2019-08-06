
import {Component, OnInit, ɵConsole} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { FinalResult } from './finalResult.model';
import { FinalResultService } from './finalResult.service';
import { Finalcatalogue } from './finalcatalogue.model';
import { map } from 'rxjs-compat/operator/map';
import { LoginService } from '../login/login.service';
import { TestService } from '../test/test.service';
import $ from "jquery";





@Component({
  selector: 'finalResult',
  templateUrl: './finalResult.component.html',
})
export class FinalResultComponent  implements OnInit{
  pageActuel: number =1;
  finalResult:FinalResult[];
  finalcjatalogues:Finalcatalogue[];
  catalogueDetails:any[];
  selectNumber:number;
  radioItems=[1,2,3,4,5,6,7,8,9,10,11]
  radioSel:any;
  radioSelected:string;
  radioSelectedString:string;
  _prevSelected: any;
  id: any;
  color:number;
  public items: Array<string>;
  public map=new Map<String, String>();
  public questionNumber : number ;
  public answerNumber : number ;
  public object : any ;
  memberId:any;
  testId:any;
  memberId1:any;
  testId1:any;


    constructor(private router:Router,
                private finalResultService:FinalResultService,
                private loginService:LoginService
                , private testService:TestService , private activatedRoute:ActivatedRoute){

                  this.items = ["1", "2", "3" , "4", "5", "6" , "7", "8", "9", "10", "11"]   

                  this.testId=localStorage.getItem('testId');

                  this.memberId=localStorage.getItem('memberId');
                  this.testId1=this.activatedRoute.snapshot.params['idT'];
                  this.memberId1=this.activatedRoute.snapshot.params['idM'];

                 
             
            
              }



  ngOnInit() {
    if(localStorage.getItem("memberId")  === null){
      //this.router.navigate(['/login']);
      this.router.navigate(['/register']);
    }
    if((localStorage.getItem("testId")===null) && (this.testId1!== null)){
      this.router.navigate(['/loginTest', this.testId1 , this.memberId1]);
    }
              
    

    
    this.finalResultService.getAllSubcategoriesByTestMember(this.testId1 , this.memberId1).subscribe(
      data=>{
        this.object=data;
        this.catalogueDetails=JSON.parse(JSON.stringify(data)).categories;
        //console.log("*************"+JSON.stringify(this.catalogueDetails));
      },err=>{
        console.log(err)
      }
    )

    this.finalResultService.calculateSkills(this.testId1 , this.memberId1).subscribe(
      data=>{
        console.log(data);
      },err=>{
        console.log(err)
      }
    )


  }


    
 
 
  public next(event){
    this.router.navigate(['/finalResultP2', this.testId1 , this.memberId1]);
 }

  public back(event){
    this.router.navigate(['/download', this.testId1 , this.memberId1]);
  }

  public logout (event){
    localStorage.clear();
    this.router.navigate(['/register'])
 }

 getColor(i){
  switch (i%3) {
    case 0:
    return '#8cb3e3';
    case 1:
    return '#1f497d';
    default:
     return '#ff5b5b';
  }
}




}

 
  

  


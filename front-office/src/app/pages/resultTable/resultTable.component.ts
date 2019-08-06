
import {Component, OnInit, ɵConsole, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { ResultTable } from './resultTable.model';
import { ResultTableService } from './resultTable.service';
import { Catalogue } from './Catalogue.model';
import { map } from 'rxjs-compat/operator/map';
import { LoginService } from '../login/login.service';
import { TestService } from '../test/test.service';
import $ from 'jquery';





@Component({
  selector: 'resultTable',
  templateUrl: './resultTable.component.html',
  styleUrls: ['./resultTable.component.scss']
})
export class ResultTableComponent  implements OnInit,AfterViewInit{
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
  id: any;
  public items: Array<string>;
  public map=new Map<String, String>();
  public questionNumber : number ;
  public answerNumber : number ;
  public object : any ;
  memberId:any;
  testId:any;
  memberId1:any;
  testId1:any;
  nombreSu:number=5;
  name = 'hhhhhhhhhhhhhhhhh';


    constructor(private router:Router,
                private resultTableService:ResultTableService,
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
              
    
    
    this.resultTableService.getAllCatrogiesByTestMember(this.testId1 , this.memberId1).subscribe(
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
  radiochangeHandler(event:any){

 

    this.selectNumber=event.traget;
    console.log(this.selectNumber)
    }
  
    public saveAnswer (manualAnswerId , answer){

      this.map.set(manualAnswerId , answer)
    }

    public totalSubcategoriesSize(){
      let questionsSize=0;


      
      this.object.categories.forEach(category => {
   
        category.subcategories.forEach(subcategory => {
        
          questionsSize=questionsSize+1;
       
      });

  });
    
      return questionsSize;
    }

 
  public open(event, item,name , categoryName , down_description ,up_description , manualAnswerId ) {
    
    this.id = manualAnswerId ;
     this.saveAnswer(this.id , item)
    
 
    this.resultTableService.updateManualAnswer(this.id,item).subscribe(
      data=>{
        console.log("update avec succes");
        
      }
    )
  }

  public download (event){
   

    console.log("totalSubcategoriesSize= "+this.totalSubcategoriesSize()+" map size= "+this.map.size);
  

    if (this.totalSubcategoriesSize() !== this.map.size ){
      alert("merci de repondre à toutes les questions ! ");
    }
    else {
      this.router.navigate(['/startTest' , this.testId1 , this.memberId1])
     
       
      }
    

  }

  public logout (event){
    localStorage.clear();
    this.router.navigate(['/register'])
 }



 ngAfterViewInit() {
  // loading templates js after dom render
     /* $.getScript("../plugins/custombox/dist/custombox.min.js", function () {
      });
      $.getScript("../plugins/custombox/dist/legacy.min.js", function () {
      });

      $.getScript("/assets/js/jquery.core.js", function () {
      });
      $.getScript("/assets/js/jquery.app.js", function () {
      });*/
    
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

  getSubcategoryDetails(subcategoryName){
    return subcategoryName;
    /*this.resultTableService.getSubcategoryDetails().subscribe(
      data=>{
        let subcategory = data.find(x=>x.name==subcategoryName);
        //let definition=data.find(x=>x.name==subcategoryName).definition;
        if(subcategory===undefined){
          return "pas de definition fournie";
        }else{
          return subcategoryName+" : "+subcategory.definition;
        }
        //alert(definition);
      },err=>{
        return "";
      }
    )*/
    /*this.resultTableService.getSubcategoryDetails().subscribe(
      data=>{
        let definition=data.find(x=>x.name==subcategoryName).definition;
        return definition;
      }
    )*/
  }
}

 
  

  


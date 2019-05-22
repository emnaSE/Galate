import {Component, OnInit, ɵConsole} from '@angular/core';
import {Router} from "@angular/router";
import { ResultTable } from './resultTable.model';
import { ResultTableService } from './resultTable.service';
import { Catalogue } from './Catalogue.model';
import { map } from 'rxjs-compat/operator/map';





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
  id: any;
  public items: Array<string>;
  public map=new Map<String, String>();
  public questionNumber : number ;
  public answerNumber : number ;
  public object : any ;
  


    constructor(private router:Router,
                private resultTableService:ResultTableService){

                  this.items = ["1", "2", "3" , "4", "5", "6" , "7", "8", "9", "10", "11"]   
                  }

                   
  ngOnInit() { 

    
  
    this.resultTableService.getAllCatrogiesByTestMember().subscribe(
      data=>{
        this.object=data;
        this.catalogueDetails=data;
        this.catalogueDetails = Array.of(this.catalogueDetails); 
      
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
      alert("Checkbox non coché ! ");
    }
    else {
    this.resultTableService.generateReportAutodiagnostic(1 ,1).subscribe(
      data=>{
        alert("telegarchement avec succes");
        
      }
    )}

  }
    }

 
  

  


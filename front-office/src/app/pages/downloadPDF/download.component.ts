import {Component, OnInit, ɵConsole} from '@angular/core';
import {Router} from "@angular/router";

import { DownloadService } from './download.service';

import { map } from 'rxjs-compat/operator/map';
import { LoginService } from '../login/login.service';
import { TestService } from '../test/test.service';





@Component({
  selector: 'download',
  templateUrl: './download.component.html',
})
export class DownloadComponent  implements OnInit{
  pageActuel: number =1;
  memberId:number;
  testId:any;
  

    constructor(private router:Router,
                private downloadService:DownloadService,
                private loginService:LoginService
                , private testService:TestService){


      if(localStorage.getItem('currentUser')!== null){
        this.memberId=this.loginService.currentUserValue.member.id;
        console.log("user"+this.memberId);    
      
      }
                    
                   
      if(localStorage.getItem('testId')!== null){
        this.testId=localStorage.getItem('testId');
        console.log("test  "+ this.testId); 
      
      
      }
    

    
     
                }

                   
  ngOnInit() {
    if((localStorage.getItem("currentUser") === null)&&(localStorage.getItem("testId") === null)&&(localStorage.getItem("testDuration") === null)){
      this.router.navigate(['/login'])
    }

 
    
 
   }
   

   public telecharger (event){
   

    this.downloadService.generateReportAutodiagnostic(this.testId ,this.memberId).subscribe(
      data=>{
        alert("telegarchement avec succes");

        
      }
    )}


    public logout (event){
      localStorage.clear();
      this.router.navigate(['/login'])
   }

  }
    

 
  

  


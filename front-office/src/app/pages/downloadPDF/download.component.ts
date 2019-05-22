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

     this.memberId=this.loginService.currentUserValue.member.id;
     console.log("user"+this.memberId);   

     this.testId=localStorage.getItem('testId');
     console.log("test  "+ this.testId); 
     
     
                }

                   
  ngOnInit() {
 
   }
   

   public telecharger (event){
   

    this.downloadService.generateReportAutodiagnostic(this.testId ,this.memberId).subscribe(
      data=>{
        alert("telegarchement avec succes");

        
      }
    )}

  }
    

 
  

  

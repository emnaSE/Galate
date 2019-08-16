
import {Component, OnInit, ɵConsole} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

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
  memberId:any;
  testId:any;
  memberId1:any;
  testId1:any;

    constructor(private router:Router,
                private downloadService:DownloadService,
                private loginService:LoginService
                , private testService:TestService,
                private activatedRoute:ActivatedRoute){


     
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
              

   }
   

   public telecharger (event){
   

    this.downloadService.generateReportAutodiagnostic(this.testId ,this.memberId).subscribe(
      data=>{
        alert("telegarchement avec succès");

        
      }
    )}

    
    public downloadPersonalityAnalyse(event){
   

      this.downloadService.downloadPersonalityAnalyse(this.testId ,this.memberId).subscribe(
        data=>{
          alert("telegarchement avec succès");
  
          
        }
      )}

      public downloadCompetences(event){
   

        this.downloadService.downloadCompetences(this.testId ,this.memberId).subscribe(
          data=>{
            alert("telegarchement avec succès");
    
            
          }
        )}

    
    public redirect(event){
      this.router.navigate(['/finalResult', this.testId1 , this.memberId1]);
   }

    public logout (event){
      localStorage.clear();
      this.router.navigate(['/register'])
   }

  }
    

 
  

  


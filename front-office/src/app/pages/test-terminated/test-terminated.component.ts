
import {Component, OnInit, ɵConsole} from '@angular/core';
import {Router} from "@angular/router";
import { TestTerminatedService } from './test-terminated.service';








@Component({
  selector: 'test-terminated',
  templateUrl: './test-terminated.component.html',
})
export class TestTerminatedComponent  implements OnInit{
  
  

    constructor(private router:Router,
                private testTerminatedService:TestTerminatedService
               ){

   
     
     
                }

                   
  ngOnInit() {

    /*if((localStorage.getItem("currentUser") === null)&&(localStorage.getItem("testId") === null)&&(localStorage.getItem("testDuration") === null)){
      this.router.navigate(['/login'])
    }*/
    if(localStorage.getItem("currentUser") === null){
     // this.router.navigate(['/login']);
     this.router.navigate(['/register']);
    }else if(localStorage.getItem("testId") === null){
      this.router.navigate(['/test']);
    }
   }
   
   public logout (event){
    localStorage.clear();
    this.router.navigate(['/register'])
 }
  

  }
    

 
  

  

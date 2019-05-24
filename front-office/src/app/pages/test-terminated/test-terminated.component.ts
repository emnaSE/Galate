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

    if((localStorage.getItem("currentUser") === null)&&(localStorage.getItem("testId") === null)&&(localStorage.getItem("testDuration") === null)){
      this.router.navigate(['/login'])
    }
 
   }
   
   public logout (event){
    localStorage.clear();
    this.router.navigate(['/login'])
 }
  

  }
    

 
  

  


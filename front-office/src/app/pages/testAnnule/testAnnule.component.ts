import {Component, OnInit, ɵConsole} from '@angular/core';
import {Router} from "@angular/router";

import { TestAnnuleService } from './testAnnule.service';







@Component({
  selector: 'testAnnule',
  templateUrl: './testAnnule.component.html',
})
export class TestAnnuleComponent  implements OnInit{
  
  

    constructor(private router:Router,
                private testAnnuleervice:TestAnnuleService,
               ){

   
     
     
                }

                   
  ngOnInit() {
 
   }
   

  

  }
    

 
  

  


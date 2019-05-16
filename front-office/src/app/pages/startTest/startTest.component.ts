import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { StartTestService} from './startTest.service';
import { StartTest } from './startTest.model';





@Component({
  selector: 'startTest',
  templateUrl: './startTest.component.html',
})
export class StartTestComponent  implements OnInit{
  pageActuel: number =1;

  


    constructor(private router:Router ,private startTestService: StartTestService){ 

      this.testsList= this.startTestService.getTodoList();
      this.map= this.startTestService.getTodoList2();
     
    }
  ngOnInit() { }


  public testsList:Array<any>;
  public map:Map<any,any>;

 

  public  getTodoList() {
      return this.startTestService.getTodoList();
  }

  public  getTodoList2() {
    return this.startTestService.getTodoList2();
}

  

  
}












 
  

  



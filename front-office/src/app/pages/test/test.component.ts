import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { TestService } from './test.service';
import { Test } from './test';




@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent  implements OnInit{

  private tests:Test[]=[];



    constructor(private router:Router, private testService: TestService){ 
      this.testsList= this.testService.getTodoList();
    }

  ngOnInit() { 

  }

  

  public testsList:Array<any>;

  public  getTodoList() {
      return this.testService.getTodoList();
  }

}

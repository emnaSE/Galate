import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { TestService } from './test.service';
import { Test } from './test';
import { Subject } from 'rxjs';




@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent  implements OnInit{

  private tests:Test[]=[];
  dtTrigger: Subject<any> = new Subject();



    constructor(private router:Router, private testService: TestService){ 
      this.testsList= this.testService.getTodoList();
    }

  ngOnInit() { 
    this.testService.getAllTests().subscribe(
      data=>{
        this.tests=data;
        this.dtTrigger.next();
      },err=>{
        console.log(err);
      }
    )
  }
  public getAllTests() {
    this.testService.getAllTests().subscribe(
      data=>{
        this.tests=data;
        this.dtTrigger.next();
      },err=>{
        console.log(err);
      }
    )
  }
  

  public testsList:Array<any>;

  public getTodoList() {
      return this.testService.getTodoList();
  }

}

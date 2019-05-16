import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { TestService } from './test.service';




@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent  implements OnInit{
  pageActuel: number =1;




    constructor(private router:Router, private testService: TestService){ 
     
    }
  ngOnInit() { }

  

  public todoList:Array<any>;
  public newTodoText:string = '';


  public  getTodoList() {
      return this.testService.getTodoList();
  }


  public addToDoItem($event) {
      if (($event.which === 1 || $event.which === 13) && this.newTodoText.trim() != '') {
          this.todoList.unshift({
              text: this.newTodoText
          });
          this.newTodoText = '';
      }
  }
}

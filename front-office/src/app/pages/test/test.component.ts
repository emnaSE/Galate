import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";




@Component({
  selector: 'test',
  templateUrl: './test.component.html',
})
export class TestComponent  implements OnInit{
  pageActuel: number =1;




    constructor(private router:Router){ }
  ngOnInit() { }

  
}

import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";




@Component({
  selector: 'startTest',
  templateUrl: './startTest.component.html',
})
export class StartTestComponent  implements OnInit{
  pageActuel: number =1;




    constructor(private router:Router){ }
  ngOnInit() { }

  
}

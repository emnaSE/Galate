import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";




@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent  implements OnInit{
  pageActuel: number =1;




    constructor(private router:Router){ }
  ngOnInit() { }

  
}

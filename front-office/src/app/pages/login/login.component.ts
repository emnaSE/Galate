import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";




@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent  implements OnInit{
  pageActuel: number =1;




    constructor(private router:Router){ }
  ngOnInit() { }

  
}

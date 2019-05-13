import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import { Subject } from 'rxjs';


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './ecole.component.html',
})
export class EcoleComponent  implements OnInit{
  pageActuel: number =1;




    constructor(private router:Router){

      }
  ngOnInit() {




  }

  create(){
      this.router.navigate(['pages/ecole/create']);
  }
}

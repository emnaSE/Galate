import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import { Subject } from 'rxjs';


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './etalonnage.component.html',
})
export class EtalonnageComponent  implements OnInit{
  pageActuel: number =1;




    constructor(private router:Router){

      }
  ngOnInit() {




  }

  create(){
      this.router.navigate(['pages/etalonnage/create']);
  }
}

import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import { Subject } from 'rxjs';


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './subcategorie.component.html',
})
export class SubcategorieComponent  implements OnInit{




    constructor(){

      }
  ngOnInit() {




  }

  create(){
      console.log("test");
  }
}

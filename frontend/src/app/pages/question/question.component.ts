import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import { Subject } from 'rxjs';


@Component({
  selector: 'ngx-question',
  templateUrl: './question.component.html',
})
export class QuestionComponent  implements OnInit{
  pageActuel: number =1;




    constructor(private router:Router){

      }
  ngOnInit() {




  }

  create(){
      this.router.navigate(['pages/question/create']);
  }
}

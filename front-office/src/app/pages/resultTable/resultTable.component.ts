import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";




@Component({
  selector: 'resultTable',
  templateUrl: './resultTable.component.html',
})
export class ResultTableComponent  implements OnInit{
  pageActuel: number =1;




    constructor(private router:Router){ }
  ngOnInit() { }

  
}

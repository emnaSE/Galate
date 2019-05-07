import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{



  constructor(private router: Router) {
  }


  ngOnInit(): void {

  }

}

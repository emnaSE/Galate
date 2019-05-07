import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{

  settings = {
    columns: {
      id: {
        title: 'ID',
        filter: true,

      },
      name: {
        title: 'Full Name',
        filter: false
      },
      username: {
        title: 'User Name',
        filter: false
      },
      email: {
        title: 'Email',
        filter: false
      }
    },
    actions: {
      position: 'right',
      add: true
    },
    mode: 'inline',
    
    pager: {
      perPage: 1
    }
  };

  data = [
    {
      id: '1',
      name: '1',
      username: '1',
      email: '1'
    }
  ];

  source: LocalDataSource;

  constructor(private router: Router) {
  }


  ngOnInit(): void {
    this.source = new LocalDataSource(this.data);
  }

  onRowSelect(event){
    console.log(event)
  }

  onChange(event) {
    console.log(event);
  }

  onCreateConfirm(event) {
    this.router.navigate(['aa '])
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'id',
        search: query
      },
      {
        field: 'name',
        search: query
      },
      {
        field: 'username',
        search: query
      },
      {
        field: 'email',
        search: query
      }
    ], false);
  }
}

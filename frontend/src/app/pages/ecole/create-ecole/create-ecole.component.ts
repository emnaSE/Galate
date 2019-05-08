import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder,AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {EcoleService} from "../ecole.service";


@Component({
  selector: 'create-commercial',
  templateUrl: './create-ecole.component.html',
  styleUrls: ['./create-ecole.component.scss']
})
export class CreateEcoleComponent implements OnInit {


  addForm:FormGroup;
  submitted = false;
  constructor(private router:Router,
              private formBuilder:FormBuilder){

  }

  ngOnInit() {
    this.addForm=this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      cat: [[], Validators.required]

    });


  }


}

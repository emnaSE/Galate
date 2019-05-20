import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
err:number;
  submitted=false;
  loginForm:FormGroup;
  username="";
  password="";
  constructor(private router:Router,
              private fromBuilder:FormBuilder,
              private authService:AuthService
              ) {

  }

  ngOnInit() {

    this.loginForm=this.fromBuilder.group({
      pseudo: ['', Validators.required],
      password: ['', Validators.required]

    })

  }
  get formValid() {
    return this.loginForm.controls;
  }

  Registre(){
    this.router.navigate(['registre']);
  }

  onSubmit(){
    this.submitted=true;

    this.authService.Login(this.formValid.pseudo.value,this.formValid.password.value).pipe(first()).subscribe(
      data=>{
        console.log("test");
        this.router.navigate(['pages/test'])
         },err=>{
        this.err=1;
      }
    )
  }

}

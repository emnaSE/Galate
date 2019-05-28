import { Component, OnInit} from '@angular/core';
import { FormsModule, AbstractControl, FormBuilder,  FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Login } from './login';
import { LoginService } from './login.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public form: FormGroup;
    public pseudo: AbstractControl;
    public password: AbstractControl;
    public bool=false;

    private currentUserSubject: BehaviorSubject<Login>;
    public currentUser: Observable<Login>;


    login: Login = new Login();
    submitted = false;
  constructor(private router: Router, fb: FormBuilder, private loginService: LoginService) {

    this.currentUserSubject = new BehaviorSubject<Login>(JSON.parse(localStorage.getItem('currentUser')));
            this.currentUser = this.currentUserSubject.asObservable();

  
  
    this.form = fb.group({
      pseudo: ['', Validators.required],
      password: ['', Validators.required]
  });

  this.pseudo = this.form.controls['pseudo'];
  this.password = this.form.controls['password'];
  }

  ngOnInit() {
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
}

  signIn() {
    this.loginService.login(this.login)
        .subscribe(data =>{
          var status=JSON.parse(JSON.stringify(data)).status;
          console.log('status='+JSON.parse(JSON.stringify(data)).status);
          if(status===200){
            this.router.navigate(['/test']);
            localStorage.setItem('currentUser', JSON.stringify(data));        
            console.log(JSON.parse(JSON.stringify(data)).member.id);
          }else{
            alert("Verifier votre login et mot de passe");
          }
        } , error => console.log('err'+error));
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted = true;
      this.signIn();
    }
  }


}

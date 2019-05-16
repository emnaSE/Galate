import { Component, OnInit} from '@angular/core';
import { FormsModule, AbstractControl, FormBuilder,  FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Login } from './Login';
import { LoginService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public form: FormGroup;
    public pseudo: AbstractControl;
    public password: AbstractControl;

    login: Login = new Login();
    submitted = false;
  constructor(private router: Router, fb: FormBuilder, private loginService: LoginService) {
  
  
    this.form = fb.group({
      pseudo: ['', Validators.required],
      password: ['', Validators.required]
  });

  this.pseudo = this.form.controls['pseudo'];
  this.password = this.form.controls['password'];
  }

  ngOnInit() {
  }

  signIn() {
    this.loginService.login(this.login)
        .subscribe(data => console.log(data), error => console.log(error));
    this.login = new Login();
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted = true;
      this.signIn();
      this.router.navigate(['/test']);
    }
  }


}

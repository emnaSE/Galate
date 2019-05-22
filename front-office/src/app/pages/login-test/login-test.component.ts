import { Component, OnInit} from '@angular/core';
import { FormsModule, AbstractControl, FormBuilder,  FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginTest } from './login-test';
import { LoginTestService } from './login-test.service';
import { TestService } from '../test/test.service';


@Component({
  selector: 'login',
  templateUrl: './login-test.component.html',
  styleUrls: ['./login-test.component.scss']
})
export class LoginTestComponent implements OnInit {

    public form: FormGroup;
    public password: AbstractControl;
    public bool=false;
    public testId:any ; 

    loginTest: LoginTest = new LoginTest();
    submitted = false;
  constructor(private router: Router, fb: FormBuilder, private loginTestService: LoginTestService , private testService:TestService) {
  
  
    this.form = fb.group({
      password: ['', Validators.required]
  });

  this.password = this.form.controls['password'];

  this.testId=localStorage.getItem('testId');
  console.log("test  "+ this.testId);   
  

  }

  ngOnInit() {
  }

  signIn() {
    this.loginTestService.login(this.loginTest , this.testId)
        .subscribe(data =>{
          var status=JSON.parse(JSON.stringify(data)).status;
          console.log('status='+JSON.parse(JSON.stringify(data)).status);
          if(status===200){
            this.router.navigate(['/startTest']);
          }else{
            alert("Le mot de passe entré est incorrecte");
          }
        } , error => console.log('err'+error));
    this.loginTest = new LoginTest();
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted = true;
      this.signIn();
    }
  }


}

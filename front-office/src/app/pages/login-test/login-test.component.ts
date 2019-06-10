import { Component, OnInit} from '@angular/core';
import { FormsModule, AbstractControl, FormBuilder,  FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
    public testId1:any ; 
    public memberId:any;
    public b=false;
    loginTest: LoginTest = new LoginTest();
    submitted = false;
  constructor(private router: Router, fb: FormBuilder, private loginTestService: LoginTestService , private testService:TestService , private activatedRoute:ActivatedRoute) {
  
    
    this.testId1=this.activatedRoute.snapshot.params['idT'];
    this.memberId=this.activatedRoute.snapshot.params['idM'];
   
   console.log(this.memberId);

    /*if(this.memberId!==undefined){
      localStorage.setItem('memberId', this.memberId);   
    }*/


    
    this.form = fb.group({
      password: ['', Validators.required]
  });

  this.password = this.form.controls['password'];

  if(localStorage.getItem('memberId')!== null){
    this.memberId=localStorage.getItem('memberId'); 
  
  }

 
      

  
  console.log("test URL  "+ this.testId1);   
  

  }

  ngOnInit() {
    /*if((localStorage.getItem("currentUser") === null)&&(localStorage.getItem("testId") === null)&&(localStorage.getItem("testDuration") === null)){
      this.router.navigate(['/login'])
    }*/
    if(localStorage.getItem("memberId") === null){
      //this.router.navigate(['/login']);
      this.router.navigate(['/register']);
    }
    
  }

  signIn() {
    this.loginTestService.loginForTest(this.loginTest , this.testId1, this.memberId)
        .subscribe(data =>{
          if(data==="success"){           
            if(this.testId===null){
              localStorage.setItem('testId', this.testId1);   
            }
            //this.router.navigate(['/startTest',this.testId1 , this.memberId]);
            this.router.navigate(['/resultTable',this.testId1 , this.memberId]);
          }else{
            alert("Le mot de passe entré est incorrecte");
          }
        } , error => console.log('err'+JSON.stringify(error)));
    this.loginTest = new LoginTest();
  }

  createDefaultTestResult(){
    this.loginTestService.createDefaultTestResult(this.testId1, this.memberId)
    .subscribe(data =>{
      console.log(data);
      this.b=true;
    } , error => {
      console.log('err'+JSON.stringify(error));
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.submitted = true;
     // this.createDefaultTestResult();
      this.signIn();
    }
  }


}

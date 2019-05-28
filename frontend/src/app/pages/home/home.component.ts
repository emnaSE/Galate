import { Component, OnInit } from '@angular/core';
import {HomeService} from "./home.service";
import {Home} from "./home.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isDisabled = false;
  filters:Home[]
  submitted=false;
  err:number;
  affiche=false;
  findForm:FormGroup;

  constructor(private homeService:HomeService,
              private formBuilder:FormBuilder) { }

  ngOnInit() {


    this.findForm=this.formBuilder.group({
      debut: [ '', Validators.required ],
      fin: [ '', Validators.required ],
      age1: ['',Validators.required],
      age2: ['',Validators.required]
    }, {validator: this.dateLessThan('debut', 'fin')});



  }
  get f() {
    return this.findForm.controls;
  }
  dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: "La date du doit être inférieure à la date du"
        };
      }
      return {};
    }
  }






  Recherche(){
    this.submitted=true;
    if (this.f.age1.value < this.f.age2.value){

     this.err = 1;
      return {
        age:"age min doit etre toujours inferieur a age maximum"
      };

    }else{
      this.affiche=true;
      this.homeService.getStat(this.f.debut.value,this.f.fin.value,this.f.age1.value,this.f.age2.value).subscribe(
        data=>{
          this.filters=data;
        },err=>{
          console.log(err);
        }
      )

    }







  }
doSearch(){
    this.Recherche();
  console.log(this.findForm.value.debut);
}
}

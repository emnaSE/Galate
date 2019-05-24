import { Router } from '@angular/router';
import { TestService } from '../test/test.service';

export class Timer {

    private _minutes: number = 0;
    private _hours: number = 0;
    private _secondes: number = 0;
 
    private _timer;
    private duration : any ;//sec
    

    constructor(private router:Router ){ 
       
      this.duration=localStorage.getItem('testDuration') ;
      this.duration =  this.duration * 60 ;
      console.log("durationTest  "+ this.duration); 

    }


    
    get hours(): number { return this._hours; }
    get minutes(): number { return this._minutes; }
    get secondes(): number { return this._secondes; }
  
  
    start() {
      this._timer = setInterval(() => {
        --this.duration;
        this._minutes = Math.floor( this.duration/ 60);
        this._secondes =  this.duration - this._minutes * 60;
        this._hours = Math.floor(this.duration / 3600);
        this._minutes = this._minutes - this._hours * 60;

       
       
     
       /* this._hours = Math.floor(this._totalMinutes / 3600);
       this._minutes = Math.floor(--this._totalSecondes / 60);
       this._secondes = this._totalSecondes - this._minutes * 60;*/
       if ((this._hours ===0)&&(this._minutes ===0)&&(this._secondes ===0)){
        this.stop();
        this.router.navigate(['/test-terminated']);
        
     }
      }, 1000); 
    

    
   
    }

   
        
      
    
    stop() {
           clearInterval(this._timer);
        
    }
    reset() {
       this._minutes = this._secondes = this._hours = 0;   }
  }
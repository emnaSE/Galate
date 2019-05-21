import {MdCardModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdDialogModule} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { DialogDemoComponent } from './dialog-demo.component';



@NgModule({
  imports: [
    BrowserModule
    BrowserAnimationsModule,
    MdCardModule,
    MdButtonModule,
    MdDialogModule
  ],
  declarations: [
    DialogDemoComponent
  ],
})
export class DialogDemoModule { }

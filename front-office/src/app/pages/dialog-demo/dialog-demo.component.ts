import {MdDialog} from '@angular/material';
@Component({
  selector: 'app-my-dialog',
  templateUrl: './dialog-demomy-dialog.component.html',
  styleUrls: ['./dialog-demo.component.css']
})
export class DialogDemoComponent implements OnInit {
  constructor(public dialog: MdDialog) {}

  openDialog() {
    let dialogRef = this.dialog.open(MyDialogComponent, {
      width: '600px',
      data: 'This text is passed into the dialog!'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
    });
  }
}
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editTT-dialog',
  templateUrl: './editTT-dialog.component.html',
  styleUrls: ['./editTT-dialog.component.scss']
})
export class EditTTDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditTTDialogComponent>,
  ) { }

  ngOnInit() {
  }

  public onConfirmEdit(): void{
    //save data
    this.dialogRef.close(true);
  }

  public onCancelEdit(): void {
    this.dialogRef.close();
  }
}

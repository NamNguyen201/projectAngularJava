import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class AddDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
  ) { }

  ngOnInit() {
  }

  public onConfirmAdd(): void{
    //save data
    this.dialogRef.close(true);
  }

  public onCancelAdd(): void {
    this.dialogRef.close();
  }

}

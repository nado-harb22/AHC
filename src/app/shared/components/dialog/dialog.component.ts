import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  // constructor(
  //   public dialogRef: MatDialogRef<DialogComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: any
  // ) {}

  // ngOnInit() {
  // }

  // /**
  //  * Close the dialog
  //  */
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  // /**
  //  * Close the dialog with confirmation action
  //  */
  // onConfirm() {
  //   this.dialogRef.close('onConfirm');
  // }
}

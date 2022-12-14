import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-director-details',
  templateUrl: './director-details.component.html',
  styleUrls: ['./director-details.component.scss'],
})
export class DirectorDetailsComponent implements OnInit {
  /**
   * Dialog receives data from outside
   * @param data
   * @param dialogRef
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birth: Date;
    },
    public dialogRef: MatDialogRef<DirectorDetailsComponent>
  ) {}

  ngOnInit(): void {}

  //CLoses dialog
  close(): void {
    this.dialogRef.close();
  }
}

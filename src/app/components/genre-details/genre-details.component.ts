import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-details',
  templateUrl: './genre-details.component.html',
  styleUrls: ['./genre-details.component.scss'],
})
export class GenreDetailsComponent implements OnInit {
  /**
   * Dialog receives data from outside
   * @param data
   * @param dialogRef
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    },
    public dialogRef: MatDialogRef<GenreDetailsComponent>
  ) {}

  ngOnInit(): void {}

  //CLoses dialog
  close(): void {
    this.dialogRef.close();
  }
}

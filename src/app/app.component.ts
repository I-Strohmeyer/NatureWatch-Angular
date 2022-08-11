import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//
import { RegistrationComponent } from './components/registration/registration.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'NatureWatch-Angular';

  constructor(public dialog: MatDialog) {}
  // This is the function that will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(RegistrationComponent, {
      // Assigning the dialog a width
      width: '400px',
    });
  }
}

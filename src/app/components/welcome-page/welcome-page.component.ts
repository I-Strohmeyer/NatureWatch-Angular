import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//
import { RegistrationComponent } from '../registration/registration.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  // Function that will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(RegistrationComponent, {
      // Assigning the dialog a width
      width: '400px',
    });
  }

  // Opens Login dialog
  openUserLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      // Assigning the dialog a width
      width: '400px',
    });
  }

  ngOnInit(): void {}
}

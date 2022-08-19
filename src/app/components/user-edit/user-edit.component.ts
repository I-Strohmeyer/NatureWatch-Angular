import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from 'src/app/services/fetch-api-data.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  @Input() userCredentials = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  user: any = {};
  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    public fetchApiData: FetchApiDataService
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  /**
   * Get single user by id
   * @function getUserData
   * @params userid
   * @returns user object
   */
  getUserData(): void {
    const userid = localStorage.getItem('userid');
    this.fetchApiData.getUser(userid).subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

  /**
   * Updates user information
   * @function editUser
   * @params userid
   * @returns user object
   */
  editUser(): void {
    const userid = localStorage.getItem('userid');
    this.fetchApiData.updateUser(userid, this.user).subscribe((resp: any) => {
      this.user = resp;
      console.log(resp);
      this.dialogRef.close();
      return this.user;
    });
  }
}

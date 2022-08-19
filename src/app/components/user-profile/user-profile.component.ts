import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../../services/fetch-api-data.service';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  //Actions:
  // update profile
  //delete profile

  ngOnInit(): void {
    this.getUserData();
    this.getMovies();
  }

  openUserEditDialog(): void {
    this.dialog.open(UserEditComponent, {
      // Assigning the dialog a width
      width: '400px',
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getUserData(): void {
    const userid = localStorage.getItem('userid');
    this.fetchApiData.getUser(userid).subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

  deleteUser(): void {
    const userid = localStorage.getItem('userid');
    this.fetchApiData.deleteUser(userid).subscribe((resp: any) => {
      this.user = {};
      localStorage.clear();
      console.log(resp);
      return resp;
    });
  }
}

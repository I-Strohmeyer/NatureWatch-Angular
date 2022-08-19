import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../../services/fetch-api-data.service';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { GenreDetailsComponent } from '../genre-details/genre-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  preFavMovies: any[] = [];
  finalFavMovies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUserData();
  }

  /**
   * Gets all movies and saving it to variable
   * @returns array of movie objects
   * @function getMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Gets a single user by id
   * @returns user object
   * @function getUserData
   * @param userid
   */
  getUserData(): void {
    const userid = localStorage.getItem('userid');
    this.fetchApiData.getUser(userid).subscribe((resp: any) => {
      this.user = resp;
      this.preFavMovies = this.user.FavoriteMovies;
      console.log(this.user);
      return this.user;
    });
  }

  // Opens genre dialog
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDetailsComponent, {
      // pass data to component
      data: {
        Name: name,
        Description: description,
      },
      // Assigning the dialog a width
      width: '400px',
    });
  }

  // Opens director dialog
  openDirectorDialog(name: string, bio: string, birth: Date): void {
    this.dialog.open(DirectorDetailsComponent, {
      // pass data to component
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      // Assigning the dialog a width
      width: '400px',
    });
  }

  /**
   * Adds movie by id to user fav list
   * @param id
   * @returns array of id objects
   */
  addMovie(id: string): void {
    this.fetchApiData.addFavMovie(id).subscribe((result) => {
      console.log('I like this movie!');
      console.log(result);
      this.ngOnInit();
    });
  }

  /**
   * Removes movie by id from user fav list
   * @param id
   */
  removeFavMovie(id: string): void {
    console.log(id);
    this.fetchApiData.removeFavMovie(id).subscribe((result) => {
      console.log('Remove this movie!');
      console.log(result);
      this.ngOnInit();
    });
  }
}

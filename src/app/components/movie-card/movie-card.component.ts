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
    //this.getFavMovies();
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
      this.preFavMovies = this.user.FavoriteMovies;
      console.log(this.user);
      return this.user;
    });
  }

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

  addMovie(id: string): void {
    this.fetchApiData.addFavMovie(id).subscribe((result) => {
      console.log('I like this movie!');
      console.log(result);
      this.ngOnInit();
    });
  }

  /**getFavMovies(): any[] {
    //flatten user fav movie array of objects
    let arrayOfIds = this.preFavMovies.map(function (obj: any) {
      return obj._id;
    });
    console.log(arrayOfIds);
    this.finalFavMovies = arrayOfIds;
    console.log(this.finalFavMovies);
    //return resultOfFavMovies;
    return this.finalFavMovies;
  }

  //boolean check to see if a movie is included in users fav movies
  isFav(id: any): boolean {
    return this.finalFavMovies.includes(id);
  } **/

  removeFavMovie(id: string): void {
    console.log(id);
    this.fetchApiData.removeFavMovie(id).subscribe((result) => {
      console.log('Remove this movie!');
      console.log(result);
      this.ngOnInit();
    });
  }
}

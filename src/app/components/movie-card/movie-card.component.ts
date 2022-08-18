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
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
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
}

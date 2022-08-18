import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://naturewatch-app.herokuapp.com/';

const token = localStorage.getItem('token');
const userID = localStorage.getItem('userid');
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // API call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users/register', userDetails)
      .pipe(catchError(this.handleError));
  }

  // API call for the user login endpoint
  public userLogin(userCredentials: any): Observable<any> {
    console.log(userCredentials);
    return this.http
      .post(apiUrl + 'login', userCredentials)
      .pipe(catchError(this.handleError));
  }

  // API call to get all movies from endpoint
  getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + `movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResData), catchError(this.handleError));
  }

  // API call to get a single movie from endpoint
  getSingleMovie(id: any): Observable<any> {
    return this.http
      .get(apiUrl + `movies/${id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResData), catchError(this.handleError));
  }

  // API call to get genre info from endpoint
  getGenre(name: any): Observable<any> {
    return this.http
      .get(apiUrl + `movies/genre/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResData), catchError(this.handleError));
  }

  // API call to get director info from endpoint
  getDirector(name: any): Observable<any> {
    return this.http
      .get(apiUrl + `movies/directors/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResData), catchError(this.handleError));
  }

  // API call to add fav movie to user endpoint
  addFavMovie(movieId: any): Observable<any> {
    return this.http
      .post(apiUrl + `users/${userID}/watchlist/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResData), catchError(this.handleError));
  }

  // API call to add fav movie to user endpoint
  removeFavMovie(movieId: any): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${userID}/watchlist/${movieId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResData), catchError(this.handleError));
  }

  // API call to get single user from endpoint
  getUser(userID: any): Observable<any> {
    return this.http
      .get(apiUrl + `users/${userID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResData), catchError(this.handleError));
  }

  // API call to update single user from endpoint
  updateUser(userID: any, userData: any): Observable<any> {
    return this.http
      .put(apiUrl + `users/${userID}`, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResData), catchError(this.handleError));
  }

  // API call to delete single user from endpoint
  deleteUser(userID: any): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${userID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResData), catchError(this.handleError));
  }

  // extract res data
  private extractResData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}

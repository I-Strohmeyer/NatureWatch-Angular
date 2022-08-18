import { Injectable } from '@angular/core';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from './fetch-api-data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private fetchData: FetchApiDataService) {}

  userLogsIn(user: any) {
    this.fetchData.userLogin(user).subscribe((result) => {
      localStorage.setItem('token', result.token);
      localStorage.setItem('username', result.user.Username);
      localStorage.setItem('userid', result.user._id);
    });

    // take argument and pass it to fetchapidata for a login
    // set localstorage items for token, userid, and username
    //redirect to movies
  }
}

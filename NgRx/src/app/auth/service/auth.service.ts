import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponseModel } from 'src/app/models/user-response.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiBaseUrl: string = 'https://localhost:7187/api/';
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient.post<UserResponseModel>(
      this.apiBaseUrl + 'Users/login',
      {
        email: email,
        password: password,
      }
    );
  }
  signup(email: string, password: string) {
    return this.httpClient.post<UserResponseModel>(
      this.apiBaseUrl + 'Users/RegistrationUser',
      {
        email: email,
        password: password,
      }
    );
  }

  getDecodeToken(token, refreshToken) {
    var userdetails = JSON.parse(atob(token.split('.')[1]));
    let { email = '', role = '', exp = 0 } = { ...userdetails };
    var user = new User(email, role, token, refreshToken, new Date(exp * 1000));
    return user;
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.runTimeoutInterval(user);
  }
  timeoutInterval: any;
  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.getExpirationDate.getTime();
    const timeInterval = expirationDate - todaysDate;

    this.timeoutInterval = setTimeout(() => {
      //logout functionality or get the refresh token
    }, timeInterval);
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(
        userData.email,
        userData.role,
        userData.token,
        userData.refreshToken,
        expirationDate
      );
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }
}

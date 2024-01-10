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

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'Email already exists';
      default:
        return 'Unknown error occurred. Please try again';
    }
  }
}

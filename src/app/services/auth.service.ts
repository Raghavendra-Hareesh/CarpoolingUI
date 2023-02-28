import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  APIurl = "https://localhost:7114/api";

  postUserLogin(userLogin:any)
  {
    return this.http.post(this.APIurl + "/Login", userLogin);
  }

  isLoggedIn()
  {
    return localStorage.getItem("Token") != null;      
  }

  getToken()
  {
    return localStorage.getItem("Token") || null;
  }
}

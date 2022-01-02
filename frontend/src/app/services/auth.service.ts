import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
const url = "https://chatnowback.herokuapp.com";
//const url = "http://localhost:3000";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }
  
  login(user : any){
    return this.http.post(url + '/out/login', user);
  }

  register(user : User){
    return this.http.post(url + '/out/register', user);
  }

}

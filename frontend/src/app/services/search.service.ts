import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const url = "https://chatnowback.herokuapp.com";
//const url = "http://localhost:3000";
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http : HttpClient) { }
  
  search(data : any){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.post(url + '/in/search', data,{ headers: reqHeader });
  }
}

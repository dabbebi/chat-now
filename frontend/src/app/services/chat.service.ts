import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const url = "https://chatnowback.herokuapp.com";
//const url = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http : HttpClient) { }
  
  getListMessages(id : string){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.get(url + '/in/getlistmessages/' + id,{ headers: reqHeader });
  }

  getMessages(data : any){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.post(url + '/in/getmessages',data , { headers: reqHeader });
  }

  sendMessage(data : any){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.post(url + '/in/sendmessage',data , { headers: reqHeader });
  }

  writeMessage(data : any){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.post(url + '/in/writemessage',data , { headers: reqHeader });
  }

  getWriteMessage(data : any){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.post(url + '/in/getwritemessage',data , { headers: reqHeader });
  }
}

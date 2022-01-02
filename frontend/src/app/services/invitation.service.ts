import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const url = "https://chatnowback.herokuapp.com";
//const url = "http://localhost:3000";
@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(private http : HttpClient) { }
  
  sendInvitation(data : any){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.post(url + '/in/sendinvitation', data,{ headers: reqHeader });
  }

  cancelInvitation(data : any){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.post(url + '/in/cancelinvitation', data,{ headers: reqHeader });
  }

  deleteInvitation(data : any){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.post(url + '/in/deleteinvitation', data,{ headers: reqHeader });
  }

  acceptInvitation(data : any){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.post(url + '/in/acceptinvitation', data,{ headers: reqHeader });
  }

  getInvitations(id : string){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.get(url + '/in/getinvitations/' + id,{ headers: reqHeader });
  }
}

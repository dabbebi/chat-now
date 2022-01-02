import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const url = "https://chatnowback.herokuapp.com";
//const url = "http://localhost:3000";
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http : HttpClient) { }
  
  getNb(id : string){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.get(url + '/in/getnb/' + id,{ headers: reqHeader });
  }

  getNbHome(id : string){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.get(url + '/in/getnbhome/' + id,{ headers: reqHeader });
  }

  getNotifications(id : string){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.get(url + '/in/getnotifications/' + id,{ headers: reqHeader });
  }

  getMyFriends(id : string){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.get(url + '/in/getmyfriends/' + id,{ headers: reqHeader });
  }

  changePassword(data : any){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.post(url + '/in/changepassword', data,{ headers: reqHeader });
  }

  createPost(data : any){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.post(url + '/in/createpost', data,{ headers: reqHeader });
  }

  getPosts(id : string){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.get(url + '/in/getmyposts/' + id,{ headers: reqHeader });
  }

  likePost(data : any){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.post(url + '/in/likepost', data,{ headers: reqHeader });
  }

  getFriends(data : any){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.post(url + '/in/getfriends',data,{ headers: reqHeader });
  }

  getName(id : string){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.get(url + '/in/getname/' + id,{ headers: reqHeader });
  }

  getStatus(data : any){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.post(url + '/in/getstatus',data,{ headers: reqHeader });
  }

  lovePost(data : any){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.post(url + '/in/lovepost', data,{ headers: reqHeader });
  }

  unLovePost(data : any){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.post(url + '/in/unlovepost', data,{ headers: reqHeader });
  }

  unLikePost(data : any){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.post(url + '/in/unlikepost', data,{ headers: reqHeader });
  }

  commentPost(data : any){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.post(url + '/in/commentpost', data,{ headers: reqHeader });
  }

  getAllPosts(id : string){
    var reqHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem("token")});
    return this.http.get(url + '/in/getallposts/' + id,{ headers: reqHeader });
  }
 
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { InvitationService } from '../../../services/invitation.service';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private searchService : SearchService, private invitationService : InvitationService) { }
  info = "";
  info2 = "";
  result = [];
  noResult = false;
  ngOnInit(): void {
    this.info = localStorage.getItem('info');
    localStorage.removeItem('info');
    if(this.info != null){
      this.search();
    }else{
      this.info = "";
    }
  }

  search(){
    if(this.info != ""){
      var data = {
        info : this.info,
        id : localStorage.getItem('user_id')
      };
      this.searchService.search(data).subscribe((data : any) => {
        console.log(data);
        this.result = data;
        if(this.result.length == 0){
          this.noResult = true;
          this.info2 = this.info;
        }else{
          this.noResult = false;
        }
      },
      (err : HttpErrorResponse)=>{
      console.log(err);
      });
    }
    
  }

  sendInvitation(id : string, hisname : string){
    var data = {
      id : localStorage.getItem('user_id'),
      friendid : id,
      myname : localStorage.getItem('name'),
      hisname : hisname
    };
    this.invitationService.sendInvitation(data).subscribe((data : any) => {
      console.log(data);
      this.result.forEach((user) => {
        if(user.id == id){
          user.status = "pending";
        }
      });
    },
    (err : HttpErrorResponse)=>{
    console.log(err);
    });
  }

  cancelInvitation(id : string){
    var data = {
      id : localStorage.getItem('user_id'),
      friendid : id
    };
    this.invitationService.cancelInvitation(data).subscribe((data : any) => {
      console.log(data);
      this.result.forEach((user) => {
        if(user.id == id){
          user.status = "user";
        }
      });
    },
    (err : HttpErrorResponse)=>{
    console.log(err);
    });
  }

  deleteInvitation(id : string){
    var data = {
      id : localStorage.getItem('user_id'),
      friendid : id
    };
    this.invitationService.deleteInvitation(data).subscribe((data : any) => {
      console.log(data);
      this.result.forEach((user) => {
        if(user.id == id){
          user.status = "user";
        }
      });
    },
    (err : HttpErrorResponse)=>{
    console.log(err);
    });
  }

  acceptInvitation(id : string, hisname : string){
    var data = {
      id : localStorage.getItem('user_id'),
      myname : localStorage.getItem('name'),
      friendid : id,
      hisname : hisname
    };
    this.invitationService.acceptInvitation(data).subscribe((data : any) => {
      console.log(data);
      this.result.forEach((user) => {
        if(user.id == id){
          user.status = "friend";
        }
      });
    },
    (err : HttpErrorResponse)=>{
    console.log(err);
    });
  }

}

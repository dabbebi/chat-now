import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { InvitationService } from '../../../services/invitation.service';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {

  constructor(private invitationService : InvitationService) { }

  ngOnInit(): void {
    this.getInvitations();
  }

  invitations = [];
  getInvitations(){
    this.invitationService.getInvitations(localStorage.getItem('user_id')).subscribe((data : any) => {
      this.invitations = data;
      console.log(data);
    },
    (err : HttpErrorResponse) => {
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
      this.getInvitations();
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
      this.getInvitations();
    },
    (err : HttpErrorResponse)=>{
    console.log(err);
    });
  }

}

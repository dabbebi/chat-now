import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private sharedService : SharedService) { }

  notifications = [];
  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(){
    this.sharedService.getNotifications(localStorage.getItem('user_id')).subscribe((data : any) => {
      this.notifications = data;
      console.log(this.notifications);
    },
    (err : HttpErrorResponse) => {
      console.log(err);
    });
  }

}

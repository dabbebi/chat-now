import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private route : ActivatedRoute, private chatService : ChatService) { }

  id = "";
  myid = localStorage.getItem('user_id');
  chatpage = false;
  messages = [];
  content = "";
  typed = "";
  mobile = window.innerWidth < 991;
  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
    });
    
    if(this.id != null){
      this.chatpage = true;
      this.getMessages();
      this.getWriteMessage();
      setTimeout(() => {
        this.ngOnInit();
      }, 500);
    }
  }

  getMessages(){
    const data = {
      myid : this.myid,
      hisid : this.id
    }
    this.chatService.getMessages(data).subscribe((data : any) => {
      this.messages = data;
      console.log(data);
    },
    (err : HttpErrorResponse) => {
      console.log(err);
    })
  }

  sendMessage(){
    const data = {
      myid : this.myid,
      hisid : this.id,
      idsender : this.myid,
      content : this.content
    }
    this.chatService.sendMessage(data).subscribe((data : any) => {
      this.content = "";
      this.getMessages();
    },
    (err : HttpErrorResponse) => {
      console.log(err);
    })
  }

  writeMessage(){
    const data = {
      myid : this.myid,
      hisid : this.id,
      content : this.content
    }
    this.chatService.writeMessage(data).subscribe((data : any) => {
      console.log(data);
    },
    (err : HttpErrorResponse) => {
      console.log(err);
    })
  }

  getWriteMessage(){
    const data = {
      myid : this.myid,
      hisid : this.id,
    }
    this.chatService.getWriteMessage(data).subscribe((data : any) => {
      if(data.length != 0){
        this.typed = data[0].content;
      }
    },
    (err : HttpErrorResponse) => {
      console.log(err);
    })
  }

}

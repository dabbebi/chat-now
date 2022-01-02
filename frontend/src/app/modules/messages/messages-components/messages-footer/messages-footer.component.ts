import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages-footer',
  templateUrl: './messages-footer.component.html',
  styleUrls: ['./messages-footer.component.css']
})
export class MessagesFooterComponent implements OnInit {
  test : Date = new Date();
  
  constructor() { }

  ngOnInit() {
  }

}

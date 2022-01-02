import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-out-footer',
  templateUrl: './outFooter.component.html',
  styleUrls: ['./outFooter.component.css']
})
export class OutFooterComponent implements OnInit {
  test : Date = new Date();
  
  constructor() { }

  ngOnInit() {
  }

}

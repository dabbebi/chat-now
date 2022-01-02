import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-in-footer',
  templateUrl: './inFooter.component.html',
  styleUrls: ['./inFooter.component.css']
})
export class InFooterComponent implements OnInit {
  test : Date = new Date();
  
  constructor() { }

  ngOnInit() {
  }

}

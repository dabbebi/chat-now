import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private sharedService : SharedService) { }

  ngOnInit(): void {
  }

  oldpass = "";
  newpass = "";
  confirmpass = "";
  entererror = false;
  confirmerror = false;
  success = false;
  passinvalid = false;
  changePassword(){
    var data = {
      id : localStorage.getItem('user_id'),
      oldpass : this.oldpass,
      newpass : this.newpass
    }
    if(this.oldpass == "" || this.newpass == "" || this.confirmpass == ""){
      this.entererror = true;
      this.confirmerror = false;
      this.success = false;
      this.passinvalid = false;
    }else if(this.newpass != this.confirmpass){
      this.confirmerror = true;
      this.entererror = false;
      this.success = false;
      this.passinvalid = false;
    }else{
      this.sharedService.changePassword(data).subscribe((data : any) => {
        this.success = true;
        this.confirmerror = false;
        this.entererror = false;
        this.passinvalid = false;
      },
      (err : HttpErrorResponse) => {
        console.log(err);
        this.passinvalid = true;
      })
    }
  }

}

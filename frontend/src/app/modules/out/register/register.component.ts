import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  user = new User();
  isRegisterError = false;
  registerSuccess = false;
  registerErrorMessage = "";
  confirmPassword = "";
  register(){
    document.getElementById("submit-btn").setAttribute("disabled","true");
    document.getElementById("submit-btn").setAttribute("style","cursor: not-allowed! important;");
    if(this.user.email == "" || this.user.password == "" || this.user.firstname == "" || this.user.lastname == ""){
      document.getElementById("submit-btn").removeAttribute("disabled");
      document.getElementById("submit-btn").setAttribute("style","cursor: pointer;background-color: rgb(27, 27, 27); color: aliceblue; height: 40px;");
      this.isRegisterError = true;
      this.registerErrorMessage = "All input fields are required !";
    }else if(this.confirmPassword != this.user.password){
      document.getElementById("submit-btn").removeAttribute("disabled");
      document.getElementById("submit-btn").setAttribute("style","cursor: pointer;background-color: rgb(27, 27, 27); color: aliceblue; height: 40px;");
      this.isRegisterError = true;
      this.registerErrorMessage = "Please confirm your password correctly !";
    }else {
      this.authService.register(this.user).subscribe((data : any)=>{
        this.registerSuccess = true;
        this.isRegisterError = false;
    },
    (err : HttpErrorResponse)=>{
      document.getElementById("submit-btn").removeAttribute("disabled");
      document.getElementById("submit-btn").setAttribute("style","cursor: pointer;background-color: rgb(27, 27, 27); color: aliceblue; height: 40px;");
      this.isRegisterError = true;
      this.registerErrorMessage = err.error.message;
      
    });
  }
  }
}

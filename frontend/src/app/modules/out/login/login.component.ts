import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  user = {email : "", password : ""};
  isLoginError = false;
  loginErrorMessage = "";

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  login(){
    if(this.user.email == "" || this.user.password == ""){
      this.isLoginError = true;
      this.loginErrorMessage = "Please enter your email and password !";
    }else {
      document.getElementById("submit-btn").setAttribute("disabled","true");
      document.getElementById("submit-btn").setAttribute("style","cursor: not-allowed! important;");

      this.authService.login(this.user).subscribe((data : any)=>{
        localStorage.setItem('token',data.accessToken);
        localStorage.setItem('user_id',data.id);
        localStorage.setItem('name',data.name);
        this.router.navigate(['/in/home']);
        this.reloadCurrentRoute();
    },
    (err : HttpErrorResponse)=>{
      document.getElementById("submit-btn").removeAttribute("disabled");
      document.getElementById("submit-btn").setAttribute("style","cursor: pointer;background-color: rgb(27, 27, 27); color: aliceblue; height: 40px;");
      this.isLoginError = true;
      this.loginErrorMessage = err.error.message;
      
    });
  }
  }

}

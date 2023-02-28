import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/Models/UserLogin';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  inpType1:string = "password";
  inpType2:string = "password";
  flag1:boolean = true;
  flag2:boolean = true;
  validEmail:boolean = true;
  validPassword:boolean = true;
  errorEmailMsg:string = "";
  errorPasswordMsg:string = "";

  loginResult:string[] = [];

  constructor(private authService:AuthService, private route:Router) 
  { 
  }

  ngOnInit(): void {
  }

  public changeType1():void
  {
    this.flag1 = !this.flag1;
    
    if(this.flag1)
      this.inpType1 = "password";
    else
      this.inpType1 = "text";
  }
  public changeType2():void
  {
    this.flag2 = !this.flag2;
    
    if(this.flag2)
      this.inpType2 = "password";
    else
      this.inpType2 = "text";
  }

  loginUser(loginForm:any)
  {
    if(loginForm.email === "")
      {
        this.errorEmailMsg = "Email cannot be Empty";
        this.validEmail = false;
      }
      else
      {
        if(!(this.validEmail = this.isValidEmail(loginForm.email)))
        {
          this.errorEmailMsg = "Invalid Email ID !!";
        }
      }

      if(loginForm.password === "")
      {
        this.errorPasswordMsg = "Password cannot be empty";
        this.validPassword = false;
      }
      else
      {
        if(!(this.validPassword =  this.isValidPassword(loginForm.password)))
        {
          this.errorPasswordMsg = "Invalid Password Format !!";
        }
      }

      if(this.validEmail && this.validPassword)
      {
        var userLogin = new UserLogin(loginForm.email, loginForm.password);
        
        this.authService.postUserLogin(userLogin).subscribe(data => 
        {
          if(data != null)
          {
            var result = (""+data).split("---");            
            console.log()
            localStorage.setItem("Token", result[0]);
            localStorage.setItem("ActiveUserID", result[1]);            
            // console.log(this.sharedService.ActiveUserID);
            alert("Login Successful");
            this.route.navigate(['/services']);
          }
          else
          {
            alert("Wrong Credentials ! ");
          }

        });        

        // if(this.sharedService.isLoggedIn)          
      }
  }

  
  isValidPassword(password:string):boolean
  {
    var regex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$";

    if(password.match(regex))
      return true;

    return false;
  }

  isValidEmail(email:string):boolean
  {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if(email.match(regex))
      return true;

    return false;
  }
}

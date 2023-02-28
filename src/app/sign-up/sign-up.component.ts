import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { share } from 'rxjs';
import { User } from 'src/Models/User';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  inpType1:string = "password";
  inpType2:string = "password";
  flag1:boolean = true;
  flag2:boolean = true;

  validEmail:boolean = true;
  validPassword:boolean = true;
  validConfirmPassword:boolean = true;
  errorPasswordMsg:string = "";
  errorEmailMsg:string = "";

  users:any = [];

  SignUpForm = new FormGroup({
    Email : new FormControl('', Validators.required),
    Password : new FormControl('', Validators.required),
    ConfirmPassword : new FormControl('', Validators.required)
  })

  constructor(private sharedService:SharedService, private route:Router) 
  { 
    sharedService.getUsersList().subscribe(data => {
      this.users = data;
    });
  }

  ngOnInit(): void {
  }

  addUser()
  {
    var name:string = (""+this.SignUpForm.value.Email).split("@")[0];

    var flag = false;

    // console.log(""+this.SignUpForm.value.Email + "  " + this.SignUpForm.value.Password + "   " + this.SignUpForm.value.ConfirmPassword);

    for(let i=0; i<this.users.length; i++)
    {
      console.log(this.users[i].email + "  " + this.SignUpForm.value.Email)

      if(this.users[i].email === (""+this.SignUpForm.value.Email))
      {
        flag = true;
        break;
      }
    }

    if(flag)
      alert("User already exists");
    else
    {
      
      if(!(this.validEmail = this.isValidEmail((""+this.SignUpForm.value.Email))))
        this.errorEmailMsg = "Invalid Email ID !!";

      if(!(this.validPassword =  this.isValidPassword((""+this.SignUpForm.value.Password))))
        this.errorPasswordMsg = "Invalid Password Format !!";      

      if(this.validEmail && this.validPassword && this.validConfirmPassword)
      {
        var last_Name = "";

        if(name.split(".")[1])
          last_Name = name.split(".")[1];

        var user = new User(name.split(".")[0], last_Name, name, (""+this.SignUpForm.value.Email), (""+this.SignUpForm.value.Password),"");    
        this.sharedService.postUserRegistration(user).subscribe(result => {
          console.log(result);
 
        });        
        this.route.navigate(['/login']);
      }
    }

  }

  matchPasswords()
  {    
    if((""+this.SignUpForm.value.ConfirmPassword) != (""+this.SignUpForm.value.Password))
      this.validConfirmPassword = false;
    else
      this.validConfirmPassword = true;
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
}

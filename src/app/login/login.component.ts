import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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
}

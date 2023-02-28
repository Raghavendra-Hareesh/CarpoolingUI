import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user:any;

  UserName:string = "";

  UserImg:string = "../../assets/user.png";

  constructor(public sharedService:SharedService) 
  { 
    sharedService.getUserByID(""+localStorage.getItem("ActiveUserID")).subscribe(data => {
      this.user = data;

      console.log(this.user);     

      this.UserName = this.user.userName;

      if(this.user.displayPicture != null)
        this.UserImg = this.user.displayPicture;
    }); 

  }

  logOutUser()
  {
    localStorage.removeItem("ActiveUserID");
    localStorage.removeItem("Token");
  }

  ngOnInit(): void {
  }


}

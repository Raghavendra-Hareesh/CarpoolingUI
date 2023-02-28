import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private sharedSerive:SharedService) { }

  UserName:string = "User";
  user:any = [];

  ngOnInit(): void 
  {
    this.sharedSerive.getUserByID("" + localStorage.getItem("ActiveUserID")).subscribe(data => {this.user = data; this.UserName = this.user.first_Name;});
  }  

}

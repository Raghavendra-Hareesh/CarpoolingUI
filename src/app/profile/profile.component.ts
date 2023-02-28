import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import { UserUpdate } from 'src/Models/UserUpdate';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  user:any = [];
  imageLink = "../../assets/user.png";

  constructor(private sharedService:SharedService, private sanitizer:DomSanitizer)
  {
    sharedService.getUserByID(""+localStorage.getItem("ActiveUserID")).subscribe(data => {
      this.user = data;

      console.log(this.user);      

      if(this.user.displayPicture != null && this.user.displayPicture != "")
        this.imageLink = this.user.displayPicture;
    })
  }
  
  ngOnInit(): void {
    this.ProfileForm.value.Gender = "undefined";
  }

  ProfileForm = new FormGroup({
    FirstName : new FormControl(this.user.first_Name),
    LastName : new FormControl(this.user.last_Name),
    UserName: new FormControl(this.user.userName),
    Phone : new FormControl(this.user.phoneNumber),
    Gender : new FormControl(this.user.gender),
  })

  updateUserDetails()
  {
    console.log(this.ProfileForm);
    
    var fname = (this.ProfileForm.value.FirstName)?this.ProfileForm.value.FirstName:this.user.first_Name;
    var lname = (this.ProfileForm.value.LastName)?this.ProfileForm.value.LastName:this.user.last_Name;
    var uname = (this.ProfileForm.value.UserName)?this.ProfileForm.value.UserName:this.user.userName;
    var phone = (this.ProfileForm.value.Phone)?this.ProfileForm.value.Phone:this.user.phoneNumber;
    var gender = (this.ProfileForm.value.Gender)?this.ProfileForm.value.Gender:this.user.gender;

    var userUpdate = new UserUpdate(""+localStorage.getItem("ActiveUserID"), fname, lname, uname, this.user.email, phone, gender, this.imageLink);

    console.log(userUpdate);

    this.sharedService.putUpdateUserDetails(userUpdate).subscribe(data => {
      alert("User Details Updated !");
    });    

    location.reload();
  }

  addImage(img:any)
  {
    var myReader = new FileReader();

    myReader.onloadend = (e) => {
      this.imageLink = "" + myReader.result
      console.log(myReader.result);
      
    };

    myReader.readAsDataURL(<File>img.target.files.item(0))
  }

}

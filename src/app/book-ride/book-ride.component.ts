import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ride } from 'src/Models/Ride';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-book-ride',
  templateUrl: './book-ride.component.html',
  styleUrls: ['./book-ride.component.scss']
})
export class BookRideComponent{

  public rides:any;
  public user:any;
  public endPoints:any = [];

  filteredRidesArray:any = [];
  showResult:boolean = false;
  seatsReq:number = 0;

  timesArray:string[] = ["5am - 9am", "9am - 12pm", "12pm - 3pm", "3pm - 6pm", "6pm - 9pm"];
  disabled:boolean[] = [false, false, false, false, false];
  selectedTime:string = "";
  blockedTimeSlots:any = [];

  constructor(public sharedService:SharedService) { 
  }

  BookingForm = new FormGroup({
    FromPlace : new FormControl('', Validators.required),    
    ToPlace : new FormControl('', Validators.required),    
    Date : new FormControl('', Validators.required),    
    SeatsRequired : new FormControl('', Validators.required),    
  })

  public updateFilterArray()
  {
    if(this.BookingForm.valid)
    {
      if(this.isValidToPlace())
      {
        this.showResult=true;

        var fromPlace =  "" + this.BookingForm.value.FromPlace;
        var toPlace =  "" + this.BookingForm.value.ToPlace;
        var Date =  "" + this.BookingForm.value.Date;
        var SeatsRequired = "" + this.BookingForm.value.SeatsRequired;
        
        var ride = new Ride(fromPlace.toLowerCase(), toPlace.toLowerCase(), Date, this.selectedTime, +SeatsRequired);
        
        this.endPoints = [];    
        this.endPoints.push(fromPlace.toLowerCase(), toPlace.toLowerCase());
        console.log(ride);

        this.seatsReq = +SeatsRequired;

        this.sharedService.postFilters(ride).subscribe(data => {
          console.log(data);
          this.filteredRidesArray = data;          
        });
      }
      else
        alert("From Place and To Place cannot be same !!");
    }
  }

  isValidToPlace():boolean
  {
    if((""+this.BookingForm.value.FromPlace).toLowerCase() == (""+ this.BookingForm.value.ToPlace).toLowerCase())
      return false;

    return true;
  }

  getTimeSlots()
  {
    if(this.BookingForm.value.Date?.length == 10)
    {      
      let date:string = (""+this.BookingForm.value.Date).replace("/","-");
      date = date.replace("/","-");

      var length = 0;

      this.sharedService.getBlockedTimeSlots(date).subscribe(data => {
        this.blockedTimeSlots = data;

        for(let i=0; i<this.blockedTimeSlots.length; i++)
        {
          let index = this.timesArray.indexOf(this.blockedTimeSlots[i]);

          this.disabled[index] = true;
        }
      });
    }
    else
      this.disabled.fill(false);
  }

}

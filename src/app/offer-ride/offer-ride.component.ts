import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Offer } from 'src/Models/Offer';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-offer-ride',
  templateUrl: './offer-ride.component.html',
  styleUrls: ['./offer-ride.component.scss']
})
export class OfferRideComponent implements OnInit {

  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {
  }

  showMore:boolean = false;

  timesArray:string[] = ["5am - 9am", "9am - 12pm", "12pm - 3pm", "3pm - 6pm", "6pm - 9pm"];
  seatsArray:number[] = [1,2,3];  

  stops:number = 2;

  disabled:boolean[] = [false, false, false, false, false];
  selectedTime:string = "";
  blockedTimeSlots:any = [];
  selectedSeat:number = -1;
  // stopVal = "";
  stopsArr = "";

  validTime:boolean = true;

  x:number = 3;

  public OfferForm = new FormGroup({
    FromPlace : new FormControl('',Validators.required),
    ToPlace : new FormControl('',Validators.required),
    Date : new FormControl('',Validators.required),
    Price : new FormControl(0,Validators.required)
  })

  postOffer(formData:any)
  {
    var stopsList = this.OfferForm.value.FromPlace + ", ";

    for(let i=0; i<this.stops; i++)
    {
      this.stopsArr += formData['stop'+ i] + ", ";
    }

    // console.log(formData);
    

    stopsList += this.stopsArr;

    stopsList += this.OfferForm.value.ToPlace;

    var activeUserId = "" + localStorage.getItem("ActiveUserID");

    var offer = new Offer(activeUserId, this.selectedSeat+1, (""+this.OfferForm.value.FromPlace).toLowerCase(), (""+this.OfferForm.value.ToPlace).toLowerCase(), stopsList, ""+this.OfferForm.value.Date, this.selectedTime, +(""+this.OfferForm.value.Price));

    this.sharedService.postOffer(offer).subscribe(res => {console.log(res)});

    alert("Offer Posted !!");

    location.reload();

    // console.log(offer);
    
  }

  validateForm()
  {
    if(this.OfferForm.valid)
    {
      if(this.selectedTime != "")
      {
        this.showMore=true;
        this.validTime = true;
      }
      else
        this.validTime = false
    }
  }

  getTimeSlots()
  {
    this.disabled.fill(false);
    
    if(this.OfferForm.value.Date?.length == 10)
    {      
      let date:string = (""+this.OfferForm.value.Date).replace("/","-");
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
  }

}

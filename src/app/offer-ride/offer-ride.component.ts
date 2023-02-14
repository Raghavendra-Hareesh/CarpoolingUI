import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer-ride',
  templateUrl: './offer-ride.component.html',
  styleUrls: ['./offer-ride.component.scss']
})
export class OfferRideComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showMore:boolean = false;

  timesArray:string[] = ["5am - 9am", "9am - 12pm", "12pm - 3pm", "3pm - 6pm", "6pm - 9pm"];
  seatsArray:number[] = [1,2,3];  

  stops:number = 1;

  selectedTime:string = "";
  selectedSeat:number = -1;

  x:number = 1;
}

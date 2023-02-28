import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  public rides:any = [];
  public bookings:any = [];
  public offers:any = [];
  public bookingDetails:any;

  constructor(public sharedService:SharedService) {             

    this.sharedService.getRidesList().subscribe((data)=>{
      this.rides = data;
    });

    this.sharedService.getBookingsList().subscribe((data)=>{
      this.bookings = data; 
    });     
    
    this.sharedService.getOffersList().subscribe(data => {
      this.offers = data;
      console.log(this.offers);
    })
  }

  ngOnInit(): void {
    this.sharedService.showBookings = false;
  }
}

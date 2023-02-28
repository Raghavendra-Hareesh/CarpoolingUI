import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, share } from 'rxjs';
import { Book } from 'src/Models/Book';
import { Ride } from 'src/Models/Ride';
import { RideCard } from 'src/Models/RideCard';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-ride-card',
  templateUrl: './ride-card.component.html',
  styleUrls: ['./ride-card.component.scss']
})
export class RideCardComponent implements OnInit {

  @Input() ride:any =[];
  @Input() path:string = "";
  @Input() pathIsBooked:boolean = false;
  @Input() endPoints:any = [];
  @Input() selectedSeats:number = 0;

  public stopsArr:string[] = [];
  user:any = [];
  username:string = "";
  userImg:string = "../../assets/user.png";
  fromStopIndex:number = 0;
  toStopIndex:number = 0;
  fromStop:string = "";
  toStop:string = "";
  bookingIDs:string[] = [];
  bookings:any = [];

  PassengerNames:string[] = [];
  
  constructor(public sharedService:SharedService, private router:Router){      
    
  }

  ngOnInit(): void {   
    console.log(this.ride); 
    
    if(this.path != 'passenger')
    {
      if(this.ride != null)
      {
        if(this.ride.stops != null)
        {
          this.stopsArr = this.ride.stops.split(", ");

          // console.log(this.stopsArr);
        }
        if(this.ride.bookingList != null)
          this.bookingIDs = this.ride.bookingList.split(", ");

        for(let i=0; i<this.bookingIDs.length; i++)
        {
          if(this.bookingIDs[i] != "")
          {
            // console.log(this.bookingIDs[i]);

            this.sharedService.getBookingByID(this.bookingIDs[i]).subscribe(data => {
              this.bookings.push(data);
              // console.log(data);
            });
          }
        }                
      }
    }
    this.sharedService.getUserByID(this.ride.driverID).subscribe((data)=>{
      this.user = data;
      
      // console.log(this.ride);
      // console.log(this.user);
      // console.log(this.endPoints);

      this.fromStop = this.endPoints[0];
      this.toStop = this.endPoints[1];

      // console.log(this.fromStop + " - - - - " + this.toStop);

      for(let i=0; i<this.stopsArr.length; i++)
      {
        if(this.fromStop === this.stopsArr[i])
          this.fromStopIndex = i;
        
        if(this.toStop === this.stopsArr[i])
          this.toStopIndex = i;
      }

      // console.log(this.fromStopIndex + " " + this.toStopIndex);

      this.username = this.user.first_Name + " " + this.user.last_Name;

      if(this.user.displayPicture != null)
        this.userImg = this.user.displayPicture;
          
    });            
  }


  buttons:number = 3;
  switchCard:boolean = true;

  bookRide()
  {
    var book = new Book(this.ride.offerID, "" + localStorage.getItem("ActiveUserID"), this.fromStop.toLowerCase(), this.toStop.toLowerCase(), this.selectedSeats, this.ride.date, this.ride.time);
    this.sharedService.postBookRide(book).subscribe(data => {      
      alert(data);
      location.reload();
    });
  }  

  passenger:any;

  updatePassengerNames()
  {
    if(this.path == 'history')
    {
      console.log(this.bookings[0]);

      for(let i=0; i<this.bookings.length && this.bookings.length > this.PassengerNames.length; i++)
      {
        // console.log(this.bookings[i]);
        this.sharedService.getUserByID(this.bookings[i].passengerID).subscribe(data => {     
          this.passenger = data;
          // console.log(this.passenger)
          this.PassengerNames.push(i + "--" +this.passenger.first_Name + " " + this.passenger.last_Name);
          // console.log(this.PassengerNames)
        });
      }
    }
  }

  updateBookingDetails(i:string)
  {        
    var ind:number = +i;

    var booking = new RideCard(this.bookings[ind].fromPlace, this.bookings[ind].toPlace, this.ride.date, this.ride.time, this.bookings[ind].numberOfSeatsBooked, this.ride.price, this.bookings[ind].passengerID);
    
    this.sharedService.bookingDetails = booking;

    this.sharedService.showBookings = true;    

  }
  
}

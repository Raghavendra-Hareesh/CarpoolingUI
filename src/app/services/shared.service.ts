import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ride } from 'src/Models/Ride';
import { User } from 'src/Models/User';
import { UserUpdate } from 'src/Models/UserUpdate';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  APIurl = "https://localhost:7114/api";


  public showBookings:boolean = false;
  public bookingDetails:any;


  constructor(private http:HttpClient) { }

  getRidesList()
  {
    return this.http.get(this.APIurl + "/rides/available");
  }
  
  getUsersList()
  {
    return this.http.get(this.APIurl + "/users/all");
  }  
  
  getUserByID(ID:string)
  {
    return this.http.get(this.APIurl + "/users/" + ID);
  }  

  putUpdateUserDetails(user:UserUpdate)
  {
    return this.http.put(this.APIurl + "/users/profile/" + localStorage.getItem("ActiveUserID"),user);
  }

  getBookingsList()
  {
    return this.http.get(this.APIurl + "/History/" + localStorage.getItem("ActiveUserID") + "/BookingHistory");
  }
  
  getOffersList()
  {
    return this.http.get(this.APIurl + "/History/" + localStorage.getItem("ActiveUserID") + "/OfferHistory");
  }

  getBookingByID(id:string)
  {
    return this.http.get(this.APIurl + "/Rides/Bookings/" + id);
  }

  getBlockedTimeSlots(date:string)
  {
    return this.http.get(this.APIurl + "/History/" + localStorage.getItem("ActiveUserID") + "/" + date);
  }

  postFilters(ride:any)
  {
    return this.http.post(this.APIurl + "/Rides/Filter/"  + localStorage.getItem("ActiveUserID"), ride);
  }
  
  postOffer(offer:any)
  {
    return this.http.post(this.APIurl + "/Offers",offer);
  }

  postUserRegistration(user:any)
  {
    return this.http.post(this.APIurl + "/Users/Register", user);
  }  

  postBookRide(book:any)
  {
    return this.http.post(this.APIurl + "/Rides/Book", book);
  }
}

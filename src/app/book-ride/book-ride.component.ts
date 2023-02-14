import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-ride',
  templateUrl: './book-ride.component.html',
  styleUrls: ['./book-ride.component.scss']
})
export class BookRideComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  filteredRidesArray:any = [];
  showResult:boolean = false;

  timesArray:string[] = ["5am - 9am", "9am - 12pm", "12pm - 3pm", "3pm - 6pm", "6pm - 9pm"];
  selectedTime:string = "";
}

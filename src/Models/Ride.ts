
export class Ride
{
    constructor(FromPlace:string, ToPlace:string, Date:string, Time:string, Seats:number)
    {
        this.FromPlace = FromPlace;
        this.ToPlace = ToPlace;
        this.Date = Date;
        this.Time = Time;
        this.SeatsRequired = Seats;
    }

    public FromPlace:string = "";
    public ToPlace:string = "";
    public Date:string = "";
    public Time:string = "";
    public SeatsRequired:number = 0;
}
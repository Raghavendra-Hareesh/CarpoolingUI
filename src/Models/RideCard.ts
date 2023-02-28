
export class RideCard
{
    constructor(FromPlace:string, ToPlace:string, Date:string, Time:string, Seats:number, price:number, driverID:string)
    {
        this.startPoint = FromPlace;
        this.endPoint = ToPlace;
        this.date = Date;
        this.time = Time;
        this.totalSeats = Seats;
        this.price = price
        this.driverID = driverID;
    }

    public startPoint:string = "";
    public endPoint:string = "";
    public date:string = "";
    public time:string = "";
    public totalSeats:number = 0;
    public price:number = 0;
    public driverID:string = "";    
}
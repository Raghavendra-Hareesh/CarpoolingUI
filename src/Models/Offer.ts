
export class Offer
{
    constructor(DriverID:string, SeatsAvailable:number, StartPoint:string, EndPoint:string, Stops:string, Date:string, Time:string, Price:number)
    {
        this.DriverID = DriverID;
        this.SeatsAvailable = SeatsAvailable;
        this.StartPoint = StartPoint;
        this.EndPoint = EndPoint;
        this.Stops = Stops;
        this.Date = Date;
        this.Time = Time;
        this.Price = Price;
    }

    public DriverID:string = "";
    public SeatsAvailable:number = 0; 
    public StartPoint:string = "";
    public EndPoint:string = "";
    public Stops:string = "";
    public Date:string = "";
    public Time:string = "";
    public Price:number = 0;
}

export class Book
{
    constructor(OfferID:string, PassengerID:string, FromPlace:string, ToPlace:string, NumOfSeatsBooked:number, Date:string, Time:string)
    {
        this.OfferID = OfferID;
        this.PassengerID = PassengerID;
        this.FromPlace = FromPlace;
        this.ToPlace = ToPlace;
        this.NumOfSeatsBooked = NumOfSeatsBooked;
        this.Date = Date;
        this.Time = Time;
    }

    public OfferID:string = "";
    public PassengerID:string = "";
    public FromPlace:string = "";
    public ToPlace:string = "";
    public NumOfSeatsBooked:number = 0;
    public Date:string = "";
    public Time:string = "";        
}
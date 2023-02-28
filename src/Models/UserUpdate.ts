export class UserUpdate
{
    constructor(UserID:string, First_Name:string, Last_Name:string, UserName:string, Email:string,PhoneNumber:string, Gender:string, DisplayPicture:string)
    {        
        this.UserID = UserID;
        this.First_Name = First_Name;
        this.Last_Name = Last_Name;
        this.UserName = UserName;
        this.Email = Email;
        this.PhoneNumber = PhoneNumber;
        this.Gender = Gender;
        this.OffersMade = "";
        this.BookingsMade = "";
        this.DisplayPicture = DisplayPicture;
    }

    public UserID:string = "";
    public First_Name:string = "";
    public Last_Name:string = "";
    public UserName:string = "";
    public Email:string = "";
    public PhoneNumber:string = "";
    public Gender:string = "";
    public OffersMade:string = "";
    public BookingsMade:string = "";
    public DisplayPicture:string = "";
}
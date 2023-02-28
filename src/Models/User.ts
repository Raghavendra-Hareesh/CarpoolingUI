import { TitleCasePipe } from "@angular/common";

export class User
{
    constructor(First_Name:string, Last_Name:string, UserName:string, Email:string, Password:string, DisplayPicture:string)
    {        
        this.First_Name = First_Name;
        this.Last_Name = Last_Name;
        this.UserName = UserName;
        this.Email = Email;
        this.Password = Password;
        this.OffersMade = "";
        this.BookingsMade = "";
        this.DisplayPicture = DisplayPicture;
    }

    public First_Name:string = "";
    public Last_Name:string = "";
    public UserName:string = "";
    public Email:string = "";
    public Password:string = "";
    public OffersMade:string = "";
    public BookingsMade:string = "";
    public DisplayPicture:string = "";
}
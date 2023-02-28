
export class UserLogin
{
    constructor(Email:string, Password:string)
    {
        this.Email = Email;
        this.Password = Password;
    }

    public Email:string = "";
    public Password:string = "";
}
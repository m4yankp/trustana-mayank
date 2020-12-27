// All the interfaces in one place
export interface IUser{
   firstName: String;
   lastName: String;
    dateOfBirth: String;
    address: String;
    username: String;
    password: String;
    filePath: String;

}

export interface ILoggedInUser extends IUser{
    loginToken: String;
    dateCreated: String;
}

export interface IAction{
    type: String,
    payload: any
}

export type Login = {
    readonly username: string;
    readonly password: string;
}
export type Register = {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    username: string;
    password: string;
    secret: string;
    address: string;
    filePath: string;
}
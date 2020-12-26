import IHash from "./Hash";

export default interface IUser extends Document{
    firstName: IHash;
    lastName: IHash;
    dateOfBirth: IHash,
    address: IHash,
    username: String,
    password: String,
    filePath: String,
}
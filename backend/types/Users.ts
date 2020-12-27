import { Document } from 'mongoose';
import IHash from "./Hash";
// Type for Users
export default interface IUser extends Document{
    firstName: IHash;
    lastName: IHash;
    dateOfBirth: IHash,
    address: IHash,
    username: String,
    password: String,
    filePath: String,
}
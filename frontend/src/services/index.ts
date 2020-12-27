import axios from 'axios';
import * as qs from 'querystring';
import * as dotenv from 'dotenv';
import { Login , Register } from '../Interfaces';

const config: any = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}
// Login User
export const LoginService = async(username: string, password: string) =>{
    dotenv.config();
    const API_URL: string = (process.env.REACT_APP_API_URL as string);
    const params: Login = {
        username: username,
        password: password
    };
    try{
        const res = await axios.post(`${API_URL}/api/auth`, qs.stringify(params),config);
        return res.data;
    }
    catch(error)
    {
        return error.response.data;
    }
}
// Register User
export const RegisterService = async(firstName: string, lastName: string, dateOfBirth:  string, username: string, password: string, secret: string, address: string, filePath: string ) => {
    dotenv.config();
    const API_URL: string = (process.env.REACT_APP_API_URL as string);
    const params: Register = {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        username: username,
        password: password,
        secret: secret,
        address: address,
        filePath: filePath
    };
    try{
        const res = await axios.post(`${API_URL}/api/user`, qs.stringify(params),config);
        return res.data;
    }
    catch(error)
    {
        return error.response.data;
    }
}
// Get Logged In User's Data
export const LoggedInUserData = async(token:string, secret_code: string) => {
    dotenv.config();
    const API_URL: string = (process.env.REACT_APP_API_URL as string);
    const params: any = {
        secret_code: secret_code
    }
    const config = {
        headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded',
        }
    };
    try{
        const res = await axios.post(`${API_URL}/api/myData`,qs.stringify(params),config);
        return res.data;
    }
    catch(error)
    {
        return error.response.data;
    }
}

// Create Token For Public Usage Of Data
export const PublicToken = async( token: string, secret_code: string, expiryTime:string) => {
    dotenv.config();
    const API_URL: string = (process.env.REACT_APP_API_URL as string);
    const config = {
        headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    const params: any = {
        expiryTime: expiryTime,
        secret_code: secret_code
    }
    try{
        const res = await axios.post(`${API_URL}/api/createTemporaryToken`, qs.stringify(params), config);
        return res.data;
    }
    catch(error)
    {
        return error.response.data;
    }
}

// Get Public Data

export const GetPublicData = async(token: string) => {
    dotenv.config();
    const API_URL: string = (process.env.REACT_APP_API_URL as string);
    const config = {
        headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    try{
        const res = await axios.get(`${API_URL}/api/getPublicData`, config);
        return res.data;
    }
    catch(error)
    {
        return error.response.data;
    }
}
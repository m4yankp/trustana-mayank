import axios from 'axios';
import * as dotenv from 'dotenv';

export const LoginService = async(username: String, password: String) =>{
    dotenv.config();

    const API_URL: string = (process.env.API_URL as string);
    console.log(API_URL);
    const params = {
        username,
        password
    };
    const res = await axios.post(`${API_URL}/api/auth`, params);
    console.log(res);
    return res;
}
import { isString } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UsersModel from '../models/UsersModel';
import IUser from "../types/Users";
import Utils from "../utils/utils";

export class Users {
    public post = async(req:Request,res:Response) => {
        const util: Utils = new Utils(req.body.secret_code);

        const user: IUser = await UsersModel.create({
            firstName: util.encryptData(req.body.firstName),
            lastName: util.encryptData(req.body.lastName),
            dateOfBirth: util.encryptData(req.body.dateOfBirth),
            address: util.encryptData(req.body.address),
            filePath: req.body.filePath,
            username: req.body.username,
            password: req.body.password
        });

        res.status(200).send({
            "success":true,
            "error": false,
            "message": "User Created Successful!",
            "data": user
        });
    }

    public getAll = async(req:Request, res:Response) => {
        const allUsers: IUser[] = await UsersModel.find({});
        const util: Utils = new Utils(req.body.secret_code);
        const ourUser:IUser = allUsers[0];

        res.status(200).send({
            "success":true,
            "error": false,
            "message": "UserData",
            "firstName": util.decryptData(ourUser.firstName),
            "lastName": util.decryptData(ourUser.lastName),
            "address": util.decryptData(ourUser.address),
        })
    }

    public createToken = async(req:Request, res: Response) => {
    
        const token = jwt.sign({ secret_code:"0920040920041234" }, "abcjwt", {
            expiresIn: 10,
        });
        console.log(token);
        console.log(jwt.decode(token));
    }


    public validateData = async(req : Request,res : Response, next: NextFunction) =>{
        if(!req.body.firstName && !isString(req.body.firstName))
        {
            res.status(400).send({
                "error": true,
                "success": false,
                "message": "Please enter first name, make sure all fields are provided"
            })
        }
        if(!req.body.lastName && !isString(req.body.lastName))
        {
            res.status(400).send({
                "error": true,
                "success": false,
                "message": "Please enter last name, make sure all fields are provided"
            })
        }
        if(!req.body.dateOfBirth && !isString(req.body.dateOfBirth))
        {
           res.status(400).send({
                "error": true,
                "success": false,
                "message": "Please enter date of birth, make sure all fields are provided"
            })
        }
        if(!req.body.address && !isString(req.body.address))
        {
            res.status(400).send({
                "error": true,
                "success": false,
                "message": "Please enter address, make sure all fields are provided"
            })
        }
        if(!req.body.password && !isString(req.body.password))
        {
            res.status(400).send({
                "error": true,
                "success": false,
                "message": "Please enter password, make sure all fields are provided"
            })
        }
        if(!req.body.username && !isString(req.body.username))
        {
            res.status(400).send({
                "error": true,
                "success": false,
                "message": "Please enter username, make sure all fields are provided"
            })
        }
        else
        {
            next();
        }
    }
}
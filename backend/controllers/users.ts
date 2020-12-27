import { isString } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import UsersModel from '../models/UsersModel';
import IUser from "../types/Users";
import Utils from "../utils/utils";

export class Users {
    constructor(){
        dotenv.config();
    }
    // Create a new User
    public post = async(req:Request,res:Response) => {
        const util: Utils = new Utils(req.body.secret_code);
        const saltRounds = 10;
        await bcrypt.hash(req.body.password, saltRounds, async(err, hash) =>{ 
            if(err)
            {
                res.status(400).send({
                    "success":false,
                    "error": true,
                    "message": "Error while creating error",
                    "data": err
                });
            }
            try{
            const user: IUser = await UsersModel.create({
                firstName: util.encryptData(req.body.firstName),
                lastName: util.encryptData(req.body.lastName),
                dateOfBirth: util.encryptData(req.body.dateOfBirth),
                address: util.encryptData(req.body.address),
                filePath: req.body.filePath,
                username: req.body.username,
                password: hash
            });
            res.status(200).send({
                "success":true,
                "error": false,
                "message": "User Created Successful!",
                "data": user
            });
            }
            catch(error){
                res.status(400).send({
                    "success":false,
                    "error": true,
                    "message": error,
                })
            } 
        });
    }
    // Get decrypted data if user provides a secert code
    public getDecryptedData = async(req:Request, res:Response) => {
        if(!req.body.secret_code)
        {
            res.status(400).send({
                "success": false,
                "error": true,
                "message": "Please provide the secert code"
            })
        }
        try{
            const user: IUser = await UsersModel.findById({_id:res.locals.jwtPayload.userId});
            const util: Utils = new Utils(req.body.secret_code);
            res.status(200).send({
                "success":true,
                "error": false,
                "message": "User's Decrypted Data",
                "firstName": util.decryptData(user.firstName),
                "lastName": util.decryptData(user.lastName),
                "address": util.decryptData(user.address),
                "dateOfBirth": util.decryptData(user.dateOfBirth)
            })
        }catch(error){
            res.status(400).send({
                "success": false,
                "error": true,
                "message": error.reason
            })
        }
    }

    // Get Data For Public use with expiry set by User
    public getDataForPublic = async(req: Request, res: Response) =>{
        if(!res.locals.jwtPayload.secret_code)
        {
            res.status(400).send({
                "success": false,
                "error": true,
                "message": "Invalid Token"
            })
        }
        if(!res.locals.jwtPayload.userId)
        {
            res.status(400).send({
                "success": false,
                "error": true,
                "message": "Invalid Token"
            })
        }
        else
        {
            try{
                const user: IUser = await UsersModel.findById({_id:res.locals.jwtPayload.userId});
                const util: Utils = new Utils(res.locals.jwtPayload.secret_code);
                res.status(200).send({
                    "success":true,
                    "error": false,
                    "message": "User's Decrypted Data",
                    "firstName": util.decryptData(user.firstName),
                    "lastName": util.decryptData(user.lastName),
                    "address": util.decryptData(user.address),
                    "dateOfBirth": util.decryptData(user.dateOfBirth)
                })
            }catch(error){
                res.status(400).send({
                    "success": false,
                    "error": true,
                    "message": error.reason
                })
            }
        }
    }

    // Validate data
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
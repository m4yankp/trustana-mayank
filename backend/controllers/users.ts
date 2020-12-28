import { isString } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import UsersModel from '../models/UsersModel';
import { AuthController } from "./auth";
import IUser from "../types/Users";
import Utils from "../utils/utils";

export class Users {
    constructor(){
        dotenv.config();
    }
    // Create a new User
    public post = async(req:any,res:Response) => {
        const util: Utils = new Utils(req.body.secret);
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
            const fileBuffer =  fs.readFileSync(req.file.path);
            const encrypted =  util.encryptFile(fileBuffer);
            fs.writeFileSync(req.file.path,encrypted);
            const user: IUser = await UsersModel.create({
                firstName: util.encryptData(req.body.firstName),
                lastName: util.encryptData(req.body.lastName),
                dateOfBirth: util.encryptData(req.body.dateOfBirth),
                address: util.encryptData(req.body.address),
                filePath: req.file.path,
                fileType: req.file.mimetype,
                fileName: req.file.filename,
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
                    "message": "Please provide all valid fields",
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
            const fileToken = await AuthController.fileDownloadToken(req.body.secret_code,user.filePath,user.fileName, user.fileType,'30d');
            res.status(200).send({
                "success":true,
                "error": false,
                "message": "User's Decrypted Data",
                "firstName": util.decryptData(user.firstName),
                "lastName": util.decryptData(user.lastName),
                "address": util.decryptData(user.address),
                "dateOfBirth": util.decryptData(user.dateOfBirth),
                "filePath": fileToken
            })
        }catch(error){
            res.status(400).send({
                "success": false,
                "error": true,
                "message": error.reason
            })
        }
    }
    // Verify if Secret Code is Valid or Not
    public verifySecretCode = async(secret,id) =>{
        try{
            const user: IUser = await UsersModel.findById({_id:id});
            const util: Utils = new Utils(secret);
            util.decryptData(user.firstName);
            return true;
        } catch(error){
            return false;
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
                const fileToken = await AuthController.fileDownloadToken(res.locals.jwtPayload.secret_code,user.filePath,user.fileName, user.fileType,'30d');
                res.status(200).send({
                    "success":true,
                    "error": false,
                    "message": "User's Decrypted Data",
                    "firstName": util.decryptData(user.firstName),
                    "lastName": util.decryptData(user.lastName),
                    "address": util.decryptData(user.address),
                    "dateOfBirth": util.decryptData(user.dateOfBirth),
                    "filePath": fileToken
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
    // Decrypt File and Download 
    public getDecryptedFile = async(req: Request, res: Response ) =>{
        const secret = res.locals.jwtPayload.secret_code;
        const filePath = res.locals.jwtPayload.filePath;
        const util: Utils = new Utils(secret);
        const fileBuffer =  fs.readFileSync(filePath);
        const decrypted = util.decryptFile(fileBuffer);
        res.setHeader('Content-Disposition', 'attachment; filename=' + res.locals.jwtPayload.fileName);
        res.setHeader( 'Content-Type', res.locals.jwtPayload.fileType );
        res.end(decrypted);
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
import { NextFunction, Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Users } from "./users";
import UsersModel from '../models/UsersModel';
import * as dotenv from 'dotenv';

export class AuthController {
    constructor(){
        dotenv.config();
    }
  // Login token
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send({
            "error": true,
            "message": "Unauthorized Access"
        });
    }
    const user: any = await UsersModel.find({username});
    if(user.length > 0)
    {
        bcrypt.compare(req.body.password, user[0].password, function(err, result) {
            if(result == true)
            {
                const token = jwt.sign(
                    { userId: user[0]._id, username: user[0].username }, process.env.JWT_SECRET,
                    { expiresIn: "30d" }
                );
                res.send({
                    "message": "Login Success",
                    "token": token,
                    "success": true,
                    "error": false
                });
            }
            else{
                res.status(401).send({
                    "error": true,
                    "success": false,
                    "message": "Unauthorized Access"
                });
            }
        });
    }
    else
    {
        res.status(401).send({
            "error": true,
            "success": false,
            "message": "User Not Found"
        });
    }
  };
  // Create a temporary token for public usage
  public createTemporaryToken = async(req:Request, res: Response) => {
        if(!req.body.secret_code)
        {
            res.status(400).send({
                "success": false,
                "error": true,
                "message": "Please provide secret code"
            });
        }
        if(!req.body.expiryTime){
            res.status(400).send({
                "success": false,
                "error": true,
                "message": "Please provide expiry time"
            });
        }
        else{
            const user = new Users();
            const isValid = await user.verifySecretCode(req.body.secret_code,res.locals.jwtPayload.userId);
            if(isValid)
            {
                try{
                const token = jwt.sign({ secret_code:req.body.secret_code, userId:res.locals.jwtPayload.userId }, process.env.JWT_PUBLICDATA_SECRET, {
                    expiresIn: req.body.expiryTime,
                });
                res.status(200).send({
                    "success":true,
                    "error": false,
                    "message": "Token for Public Usage",
                    "token": token
                });
                }
                catch(error)
                {
                    res.status(401).send({
                        "success":false,
                        "error": true,
                        "message": error
                    });
                }

            }
            else
            {
                res.status(401).send({
                    "success":false,
                    "error": true,
                    "message": "Invalid Secret Code"
                });
            }
            
        }
    }
    // Check If user is logged in or not
    public checkLogin = async(req: Request, res: Response, next: NextFunction) => {
        const token = <string>req.headers["authorization"].replace("Bearer ","");
        let jwtPayload;
            try {
                jwtPayload = <any>jwt.verify(token, process.env.JWT_SECRET);
                res.locals.jwtPayload = jwtPayload;
                next();
            } catch (error) {
            //If token is not valid, respond with 401 (unauthorized)
            res.status(401).send({
                "error": true,
                "success": false,
                "message": "Unauthorized Access"
            });
            }
    }
    // Check if Public Access Token is Valid or not
    public checkPublicAccess = async(req: Request, res: Response, next: NextFunction) =>{
        const token = <string>req.headers["authorization"].replace("Bearer ","");
        let jwtPayload;
        try {
            jwtPayload = <any>jwt.verify(token, process.env.JWT_PUBLICDATA_SECRET);
            res.locals.jwtPayload = jwtPayload;
            next();
        } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).send({
            "error": true,
            "success": false,
            "message": "Unauthorized Access"
        });
        }
    }

    // Token to decrypt and download file
    public static fileDownloadToken = async(secret: String ,filePath: String , fileName: String, fileType: String, expiryTime: String) =>{
        const token = jwt.sign({ secret_code:secret, filePath:filePath, fileName: fileName, fileType: fileType }, process.env.JWT_PUBLICDATA_SECRET, {
            expiresIn: expiryTime,
        });
        return token;
    }

    // Verify File Token and Pass Payload
    public checkFileToken = async ( req: Request, res: Response, next: NextFunction) =>{
        const token = req.params.token;
        try {
            const jwtPayload = <any>jwt.verify(token, process.env.JWT_PUBLICDATA_SECRET);
            res.locals.jwtPayload = jwtPayload;
            next();
        } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).send({
            "error": true,
            "success": false,
            "message": "Unauthorized Access"
        });
        }
    }
}
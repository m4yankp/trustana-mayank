"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UsersModel_1 = require("../models/UsersModel");
const dotenv = require("dotenv");
class AuthController {
    constructor() {
        // Create a temporary token for public usage
        this.createTemporaryToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.body.secret_code) {
                res.status(400).send({
                    "success": false,
                    "error": true,
                    "message": "Please provide secret code"
                });
            }
            if (!req.body.expiryTime) {
                res.status(400).send({
                    "success": false,
                    "error": true,
                    "message": "Please provide expiry time"
                });
            }
            else {
                const token = jwt.sign({ secret_code: req.body.secret_code, userId: res.locals.jwtPayload.userId }, process.env.JWT_PUBLICDATA_SECRET, {
                    expiresIn: req.body.expiryTime,
                });
                res.status(200).send({
                    "success": true,
                    "error": false,
                    "message": "Token for Public Usage",
                    "token": token
                });
            }
        });
        // Check If user is logged in or not
        this.checkLogin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers["authorization"].replace("Bearer ", "");
            let jwtPayload;
            try {
                jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
                res.locals.jwtPayload = jwtPayload;
                next();
            }
            catch (error) {
                //If token is not valid, respond with 401 (unauthorized)
                res.status(401).send({
                    "error": true,
                    "success": false,
                    "message": "Unauthorized Access"
                });
            }
        });
        // Check if Public Access Token is Valid or not
        this.checkPublicAccess = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers["authorization"].replace("Bearer ", "");
            let jwtPayload;
            try {
                jwtPayload = jwt.verify(token, process.env.JWT_PUBLICDATA_SECRET);
                res.locals.jwtPayload = jwtPayload;
                next();
            }
            catch (error) {
                //If token is not valid, respond with 401 (unauthorized)
                res.status(401).send({
                    "error": true,
                    "success": false,
                    "message": "Unauthorized Access"
                });
            }
        });
        dotenv.config();
    }
}
exports.AuthController = AuthController;
// Login token
AuthController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Check if username and password are set
    const { username, password } = req.body;
    if (!(username && password)) {
        res.status(400).send({
            "error": true,
            "message": "Unauthorized Access"
        });
    }
    const user = yield UsersModel_1.default.find({ username });
    if (user.length > 0) {
        bcrypt.compare(req.body.password, user[0].password, function (err, result) {
            if (result == true) {
                const token = jwt.sign({ userId: user[0]._id, username: user[0].username }, process.env.JWT_SECRET, { expiresIn: "30d" });
                res.send({
                    "message": "Login Success",
                    "token": token,
                    "success": true,
                    "error": false
                });
            }
            else {
                res.status(401).send({
                    "error": true,
                    "success": false,
                    "message": "Unauthorized Access"
                });
            }
        });
    }
    else {
        res.status(401).send({
            "error": true,
            "success": false,
            "message": "User Not Found"
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbnRyb2xsZXJzL2F1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsaUNBQWlDO0FBQ2pDLG9DQUFvQztBQUNwQyxxREFBOEM7QUFDOUMsaUNBQWlDO0FBRWpDLE1BQWEsY0FBYztJQUN2QjtRQWdERiw0Q0FBNEM7UUFDckMseUJBQW9CLEdBQUcsQ0FBTSxHQUFXLEVBQUUsR0FBYSxFQUFFLEVBQUU7WUFDNUQsSUFBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUN4QjtnQkFDSSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDakIsU0FBUyxFQUFFLEtBQUs7b0JBQ2hCLE9BQU8sRUFBRSxJQUFJO29CQUNiLFNBQVMsRUFBRSw0QkFBNEI7aUJBQzFDLENBQUMsQ0FBQzthQUNOO1lBQ0QsSUFBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDO2dCQUNwQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDakIsU0FBUyxFQUFFLEtBQUs7b0JBQ2hCLE9BQU8sRUFBRSxJQUFJO29CQUNiLFNBQVMsRUFBRSw0QkFBNEI7aUJBQzFDLENBQUMsQ0FBQzthQUNOO2lCQUNHO2dCQUNBLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUU7b0JBQ3JJLFNBQVMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVU7aUJBQzdCLENBQUMsQ0FBQztnQkFDSCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FB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
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbnRyb2xsZXJzL2F1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsaUNBQWlDO0FBQ2pDLG9DQUFvQztBQUNwQyxxREFBOEM7QUFDOUMsaUNBQWlDO0FBRWpDLE1BQWEsY0FBYztJQUN2QjtRQWdESyx5QkFBb0IsR0FBRyxDQUFNLEdBQVcsRUFBRSxHQUFhLEVBQUUsRUFBRTtZQUM1RCxJQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQ3hCO2dCQUNJLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNqQixTQUFTLEVBQUUsS0FBSztvQkFDaEIsT0FBTyxFQUFFLElBQUk7b0JBQ2IsU0FBUyxFQUFFLDRCQUE0QjtpQkFDMUMsQ0FBQyxDQUFDO2FBQ047WUFDRCxJQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUM7Z0JBQ3BCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNqQixTQUFTLEVBQUUsS0FBSztvQkFDaEIsT0FBTyxFQUFFLElBQUk7b0JBQ2IsU0FBUyxFQUFFLDRCQUE0QjtpQkFDMUMsQ0FBQyxDQUFDO2FBQ047aUJBQ0c7Z0JBQ0EsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsRUFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRTtvQkFDckksU0FBUyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVTtpQkFDN0IsQ0FBQyxDQUFDO2dCQUNILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxD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
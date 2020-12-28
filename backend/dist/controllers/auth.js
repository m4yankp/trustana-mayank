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
const users_1 = require("./users");
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
                const user = new users_1.Users();
                const isValid = yield user.verifySecretCode(req.body.secret_code, res.locals.jwtPayload.userId);
                if (isValid) {
                    try {
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
                    catch (error) {
                        res.status(401).send({
                            "success": false,
                            "error": true,
                            "message": error
                        });
                    }
                }
                else {
                    res.status(401).send({
                        "success": false,
                        "error": true,
                        "message": "Invalid Secret Code"
                    });
                }
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
        // Verify File Token and Pass Payload
        this.checkFileToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.params.token;
            try {
                const jwtPayload = jwt.verify(token, process.env.JWT_PUBLICDATA_SECRET);
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
// Token to decrypt and download file
AuthController.fileDownloadToken = (secret, filePath, fileName, fileType, expiryTime) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jwt.sign({ secret_code: secret, filePath: filePath, fileName: fileName, fileType: fileType }, process.env.JWT_PUBLICDATA_SECRET, {
        expiresIn: expiryTime,
    });
    return token;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbnRyb2xsZXJzL2F1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsaUNBQWlDO0FBQ2pDLG9DQUFvQztBQUNwQyxtQ0FBZ0M7QUFDaEMscURBQThDO0FBQzlDLGlDQUFpQztBQUVqQyxNQUFhLGNBQWM7SUFDdkI7UUFnREYsNENBQTRDO1FBQ3JDLHlCQUFvQixHQUFHLENBQU0sR0FBVyxFQUFFLEdBQWEsRUFBRSxFQUFFO1lBQzVELElBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFDeEI7Z0JBQ0ksR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ2pCLFNBQVMsRUFBRSxLQUFLO29CQUNoQixPQUFPLEVBQUUsSUFBSTtvQkFDYixTQUFTLEVBQUUsNEJBQTRCO2lCQUMxQyxDQUFDLENBQUM7YUFDTjtZQUNELElBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQztnQkFDcEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ2pCLFNBQVMsRUFBRSxLQUFLO29CQUNoQixPQUFPLEVBQUUsSUFBSTtvQkFDYixTQUFTLEVBQUUsNEJBQTRCO2lCQUMxQyxDQUFDLENBQUM7YUFDTjtpQkFDRztnQkFDQSxNQUFNLElBQUksR0FBRyxJQUFJLGFBQUssRUFBRSxDQUFDO2dCQUN6QixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0YsSUFBRyxPQUFPLEVBQ1Y7b0JBQ0ksSUFBRzt3QkFDSCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyxFQUFD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
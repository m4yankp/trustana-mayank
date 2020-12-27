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
exports.Users = void 0;
const class_validator_1 = require("class-validator");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const UsersModel_1 = require("../models/UsersModel");
const utils_1 = require("../utils/utils");
class Users {
    constructor() {
        // Create a new User
        this.post = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const util = new utils_1.default(req.body.secret_code);
            const saltRounds = 10;
            yield bcrypt.hash(req.body.password, saltRounds, (err, hash) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    res.status(400).send({
                        "success": false,
                        "error": true,
                        "message": "Error while creating error",
                        "data": err
                    });
                }
                try {
                    const user = yield UsersModel_1.default.create({
                        firstName: util.encryptData(req.body.firstName),
                        lastName: util.encryptData(req.body.lastName),
                        dateOfBirth: util.encryptData(req.body.dateOfBirth),
                        address: util.encryptData(req.body.address),
                        filePath: req.body.filePath,
                        username: req.body.username,
                        password: hash
                    });
                    res.status(200).send({
                        "success": true,
                        "error": false,
                        "message": "User Created Successful!",
                        "data": user
                    });
                }
                catch (error) {
                    res.status(400).send({
                        "success": false,
                        "error": true,
                        "message": error,
                    });
                }
            }));
        });
        // Get decrypted data if user provides a secert code
        this.getDecryptedData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!req.body.secret_code) {
                res.status(400).send({
                    "success": false,
                    "error": true,
                    "message": "Please provide the secert code"
                });
            }
            try {
                const user = yield UsersModel_1.default.findById({ _id: res.locals.jwtPayload.userId });
                const util = new utils_1.default(req.body.secret_code);
                res.status(200).send({
                    "success": true,
                    "error": false,
                    "message": "User's Decrypted Data",
                    "firstName": util.decryptData(user.firstName),
                    "lastName": util.decryptData(user.lastName),
                    "address": util.decryptData(user.address),
                    "dateOfBirth": util.decryptData(user.dateOfBirth)
                });
            }
            catch (error) {
                res.status(400).send({
                    "success": false,
                    "error": true,
                    "message": error.reason
                });
            }
        });
        // Get Data For Public use with expiry set by User
        this.getDataForPublic = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!res.locals.jwtPayload.secret_code) {
                res.status(400).send({
                    "success": false,
                    "error": true,
                    "message": "Invalid Token"
                });
            }
            if (!res.locals.jwtPayload.userId) {
                res.status(400).send({
                    "success": false,
                    "error": true,
                    "message": "Invalid Token"
                });
            }
            else {
                try {
                    const user = yield UsersModel_1.default.findById({ _id: res.locals.jwtPayload.userId });
                    const util = new utils_1.default(res.locals.jwtPayload.secret_code);
                    res.status(200).send({
                        "success": true,
                        "error": false,
                        "message": "User's Decrypted Data",
                        "firstName": util.decryptData(user.firstName),
                        "lastName": util.decryptData(user.lastName),
                        "address": util.decryptData(user.address),
                        "dateOfBirth": util.decryptData(user.dateOfBirth)
                    });
                }
                catch (error) {
                    res.status(400).send({
                        "success": false,
                        "error": true,
                        "message": error.reason
                    });
                }
            }
        });
        // Validate data
        this.validateData = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (!req.body.firstName && !class_validator_1.isString(req.body.firstName)) {
                res.status(400).send({
                    "error": true,
                    "success": false,
                    "message": "Please enter first name, make sure all fields are provided"
                });
            }
            if (!req.body.lastName && !class_validator_1.isString(req.body.lastName)) {
                res.status(400).send({
                    "error": true,
                    "success": false,
                    "message": "Please enter last name, make sure all fields are provided"
                });
            }
            if (!req.body.dateOfBirth && !class_validator_1.isString(req.body.dateOfBirth)) {
                res.status(400).send({
                    "error": true,
                    "success": false,
                    "message": "Please enter date of birth, make sure all fields are provided"
                });
            }
            if (!req.body.address && !class_validator_1.isString(req.body.address)) {
                res.status(400).send({
                    "error": true,
                    "success": false,
                    "message": "Please enter address, make sure all fields are provided"
                });
            }
            if (!req.body.password && !class_validator_1.isString(req.body.password)) {
                res.status(400).send({
                    "error": true,
                    "success": false,
                    "message": "Please enter password, make sure all fields are provided"
                });
            }
            if (!req.body.username && !class_validator_1.isString(req.body.username)) {
                res.status(400).send({
                    "error": true,
                    "success": false,
                    "message": "Please enter username, make sure all fields are provided"
                });
            }
            else {
                next();
            }
        });
        dotenv.config();
    }
}
exports.Users = Users;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb250cm9sbGVycy91c2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxREFBMkM7QUFFM0MsaUNBQWlDO0FBQ2pDLGlDQUFpQztBQUNqQyxxREFBOEM7QUFFOUMsMENBQW1DO0FBRW5DLE1BQWEsS0FBSztJQUNkO1FBR0Esb0JBQW9CO1FBQ2IsU0FBSSxHQUFHLENBQU0sR0FBVyxFQUFDLEdBQVksRUFBRSxFQUFFO1lBQzVDLE1BQU0sSUFBSSxHQUFVLElBQUksZUFBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDcEQsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBTSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQ2hFLElBQUcsR0FBRyxFQUNOO29CQUNJLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUNqQixTQUFTLEVBQUMsS0FBSzt3QkFDZixPQUFPLEVBQUUsSUFBSTt3QkFDYixTQUFTLEVBQUUsNEJBQTRCO3dCQUN2QyxNQUFNLEVBQUUsR0FBRztxQkFDZCxDQUFDLENBQUM7aUJBQ047Z0JBQ0QsSUFBRztvQkFDSCxNQUFNLElBQUksR0FBVSxNQUFNLG9CQUFVLENBQUMsTUFBTSxDQUFDO3dCQUN4QyxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzt3QkFDL0MsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7d0JBQzdDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMs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
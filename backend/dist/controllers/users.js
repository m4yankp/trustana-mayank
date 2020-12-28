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
const fs = require("fs");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const UsersModel_1 = require("../models/UsersModel");
const auth_1 = require("./auth");
const utils_1 = require("../utils/utils");
class Users {
    constructor() {
        // Create a new User
        this.post = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const util = new utils_1.default(req.body.secret);
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
                    const fileBuffer = fs.readFileSync(req.file.path);
                    const encrypted = util.encryptFile(fileBuffer);
                    fs.writeFileSync(req.file.path, encrypted);
                    const user = yield UsersModel_1.default.create({
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
                        "message": "Please provide all valid fields",
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
                const fileToken = yield auth_1.AuthController.fileDownloadToken(req.body.secret_code, user.filePath, user.fileName, user.fileType, '30d');
                res.status(200).send({
                    "success": true,
                    "error": false,
                    "message": "User's Decrypted Data",
                    "firstName": util.decryptData(user.firstName),
                    "lastName": util.decryptData(user.lastName),
                    "address": util.decryptData(user.address),
                    "dateOfBirth": util.decryptData(user.dateOfBirth),
                    "filePath": fileToken
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
        // Verify if Secret Code is Valid or Not
        this.verifySecretCode = (secret, id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UsersModel_1.default.findById({ _id: id });
                const util = new utils_1.default(secret);
                util.decryptData(user.firstName);
                return true;
            }
            catch (error) {
                return false;
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
                    const fileToken = yield auth_1.AuthController.fileDownloadToken(res.locals.jwtPayload.secret_code, user.filePath, user.fileName, user.fileType, '30d');
                    res.status(200).send({
                        "success": true,
                        "error": false,
                        "message": "User's Decrypted Data",
                        "firstName": util.decryptData(user.firstName),
                        "lastName": util.decryptData(user.lastName),
                        "address": util.decryptData(user.address),
                        "dateOfBirth": util.decryptData(user.dateOfBirth),
                        "filePath": fileToken
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
        // Decrypt File and Download 
        this.getDecryptedFile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const secret = res.locals.jwtPayload.secret_code;
            const filePath = res.locals.jwtPayload.filePath;
            const util = new utils_1.default(secret);
            const fileBuffer = fs.readFileSync(filePath);
            const decrypted = util.decryptFile(fileBuffer);
            res.setHeader('Content-Disposition', 'attachment; filename=' + res.locals.jwtPayload.fileName);
            res.setHeader('Content-Type', res.locals.jwtPayload.fileType);
            res.end(decrypted);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb250cm9sbGVycy91c2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxREFBMkM7QUFFM0MseUJBQXlCO0FBQ3pCLGlDQUFpQztBQUNqQyxpQ0FBaUM7QUFDakMscURBQThDO0FBQzlDLGlDQUF3QztBQUV4QywwQ0FBbUM7QUFFbkMsTUFBYSxLQUFLO0lBQ2Q7UUFHQSxvQkFBb0I7UUFDYixTQUFJLEdBQUcsQ0FBTSxHQUFPLEVBQUMsR0FBWSxFQUFFLEVBQUU7WUFDeEMsTUFBTSxJQUFJLEdBQVUsSUFBSSxlQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvQyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDdEIsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFNLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFDaEUsSUFBRyxHQUFHLEVBQ047b0JBQ0ksR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ2pCLFNBQVMsRUFBQyxLQUFLO3dCQUNmLE9BQU8sRUFBRSxJQUFJO3dCQUNiLFNBQVMsRUFBRSw0QkFBNEI7d0JBQ3ZDLE1BQU0sRUFBRSxHQUFHO3FCQUNkLENBQUMsQ0FBQztpQkFDTjtnQkFDRCxJQUFHO29CQUNILE1BQU0sVUFBVSxHQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbkQsTUFBTSxTQUFTLEdBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDaEQsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxTQUFTLENBQUMsQ0FBQztvQkFDMUMs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
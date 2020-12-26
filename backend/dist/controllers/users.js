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
const jsonwebtoken_1 = require("jsonwebtoken");
const UsersModel_1 = require("../models/UsersModel");
const utils_1 = require("../utils/utils");
class Users {
    constructor() {
        this.post = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const util = new utils_1.default(req.body.secret_code);
            const user = yield UsersModel_1.default.create({
                firstName: util.encryptData(req.body.firstName),
                lastName: util.encryptData(req.body.lastName),
                dateOfBirth: util.encryptData(req.body.dateOfBirth),
                address: util.encryptData(req.body.address),
                filePath: req.body.filePath,
                username: req.body.username,
                password: req.body.password
            });
            res.status(200).send({
                "success": true,
                "error": false,
                "message": "User Created Successful!",
                "data": user
            });
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield UsersModel_1.default.find({});
            const util = new utils_1.default(req.body.secret_code);
            const ourUser = allUsers[0];
            res.status(200).send({
                "success": true,
                "error": false,
                "message": "UserData",
                "firstName": util.decryptData(ourUser.firstName),
                "lastName": util.decryptData(ourUser.lastName),
                "address": util.decryptData(ourUser.address),
            });
        });
        this.createToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.jwt.sign({ secret_code: "0920040920041234" }, "abcjwt", {
                expiresIn: 10,
            });
            console.log(token);
            console.log(jsonwebtoken_1.jwt.decode(token));
        });
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
    }
}
exports.Users = Users;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb250cm9sbGVycy91c2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxREFBMkM7QUFFM0MsK0NBQWlDO0FBQ2pDLHFEQUE4QztBQUU5QywwQ0FBbUM7QUFFbkMsTUFBYSxLQUFLO0lBQWxCO1FBQ1csU0FBSSxHQUFHLENBQU0sR0FBVyxFQUFDLEdBQVksRUFBRSxFQUFFO1lBQzVDLE1BQU0sSUFBSSxHQUFVLElBQUksZUFBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFcEQsTUFBTSxJQUFJLEdBQVUsTUFBTSxvQkFBVSxDQUFDLE1BQU0sQ0FBQztnQkFDeEMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQy9DLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUM3QyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDbkQsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQzNDLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVE7Z0JBQzNCLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVE7Z0JBQzNCLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVE7YUFDOUIsQ0FBQyxDQUFDO1lBRUgsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pCLFNBQVMsRUFBQyxJQUFJO2dCQUNkLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFNBQVMsRUFBRSwwQkFBMEI7Z0JBQ3JDLE1BQU0sRUFB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
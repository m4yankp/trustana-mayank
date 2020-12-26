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
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoose_1 = require("mongoose");
const usersRoutes_1 = require("./routes/usersRoutes");
const index_1 = require("./routes/index");
const authRoutes_1 = require("./routes/authRoutes");
const dotenv = require("dotenv");
class App {
    constructor() {
        this.userRoutes = new usersRoutes_1.UserRoutes();
        this.authRoutes = new authRoutes_1.AuthRoutes();
        this.commonRoutes = new index_1.CommonRoutes();
        this.connectDB = () => __awaiter(this, void 0, void 0, function* () {
            dotenv.config();
            yield mongoose_1.connect(process.env.MONGODBURL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }).then(() => {
                console.log("Mongo Db connected");
            }).catch((err) => {
                console.log(err);
            });
        });
        this.app = express();
        this.middleWare();
        this.userRoutes.route(this.app);
        this.authRoutes.route(this.app);
        this.commonRoutes.route(this.app);
        this.connectDB();
    }
    middleWare() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
exports.default = new App().app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW1DO0FBQ25DLDBDQUEwQztBQUMxQyw2QkFBNkI7QUFDN0IsaUNBQWlDO0FBQ2pDLHVDQUFtQztBQUNuQyxzREFBa0Q7QUFDbEQsMENBQThDO0FBQzlDLG9EQUFpRDtBQUNqRCxpQ0FBaUM7QUFFakMsTUFBTSxHQUFHO0lBTU47UUFKTyxlQUFVLEdBQWUsSUFBSSx3QkFBVSxFQUFFLENBQUM7UUFDMUMsZUFBVSxHQUFlLElBQUksdUJBQVUsRUFBRSxDQUFDO1FBQzFDLGlCQUFZLEdBQWlCLElBQUksb0JBQVksRUFBRSxDQUFDO1FBbUIvQyxjQUFTLEdBQUcsR0FBUSxFQUFFO1lBQzNCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNoQixNQUFNLGtCQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7Z0JBQ25DLGVBQWUsRUFBRSxJQUFJO2dCQUNyQixrQkFBa0IsRUFBRSxJQUFJO2FBQzFCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRSxFQUFFO2dCQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRTtnQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxDQUFBLENBQUE7UUExQkUsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDTyxVQUFVO1FBQ1osMENBQTBDO1FBQzFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLHFEQUFxRDtRQUNyRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztDQWFOO0FBQ0Qsa0JBQWUsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMifQ==
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
        // Import user Routes
        this.userRoutes = new usersRoutes_1.UserRoutes();
        // Import Auth Routes
        this.authRoutes = new authRoutes_1.AuthRoutes();
        // Import Common Routes
        this.commonRoutes = new index_1.CommonRoutes();
        // Connect mongoose DB
        this.connectDB = () => __awaiter(this, void 0, void 0, function* () {
            dotenv.config();
            yield mongoose_1.connect(process.env.MONGODBURL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
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
        this.app.use("/files", express.static("uploads"));
        //support application/x-www-form-urlencoded post data
        this.app.use(helmet());
        //Allow Cors
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: false, limit: "100mb" }));
    }
}
exports.default = new App().app;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW1DO0FBQ25DLDBDQUEwQztBQUMxQyw2QkFBNkI7QUFDN0IsaUNBQWlDO0FBQ2pDLHVDQUFtQztBQUNuQyxzREFBa0Q7QUFDbEQsMENBQThDO0FBQzlDLG9EQUFpRDtBQUNqRCxpQ0FBaUM7QUFFakMsTUFBTSxHQUFHO0lBU047UUFQQSxxQkFBcUI7UUFDZCxlQUFVLEdBQWUsSUFBSSx3QkFBVSxFQUFFLENBQUM7UUFDakQscUJBQXFCO1FBQ2QsZUFBVSxHQUFlLElBQUksdUJBQVUsRUFBRSxDQUFDO1FBQ2pELHVCQUF1QjtRQUNoQixpQkFBWSxHQUFpQixJQUFJLG9CQUFZLEVBQUUsQ0FBQztRQXFCdkQsc0JBQXNCO1FBQ2QsY0FBUyxHQUFHLEdBQVEsRUFBRTtZQUMzQixNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDaEIsTUFBTSxrQkFBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFO2dCQUNuQyxlQUFlLEVBQUUsSUFBSTtnQkFDckIsa0JBQWtCLEVBQUUsSUFBSTtnQkFDeEIsY0FBYyxFQUFFLElBQUk7YUFDdEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFFLEVBQUU7Z0JBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBQyxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDTixDQUFDLENBQUEsQ0FBQTtRQTlCRSxJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNPLFVBQVU7UUFDWiwwQ0FBMEM7UUFDMUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNsRCxxREFBcUQ7UUFDckQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN2QixZQUFZO1FBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7Q0FlTjtBQUNELGtCQUFlLElBQUksR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDIn0=
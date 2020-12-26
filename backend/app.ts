import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as helmet from "helmet"; 
import { connect } from "mongoose";
import { UserRoutes } from "./routes/usersRoutes";
import { CommonRoutes } from "./routes/index";
import { AuthRoutes } from "./routes/authRoutes";
import * as dotenv from 'dotenv';

class App {
   public app: express.Application;
   public userRoutes: UserRoutes = new UserRoutes();
   public authRoutes: AuthRoutes = new AuthRoutes();
   public commonRoutes: CommonRoutes = new CommonRoutes();
   public JWTSeceret: string;
   constructor() {
      this.app = express();
      this.middleWare();
      this.userRoutes.route(this.app);
      this.authRoutes.route(this.app);
      this.commonRoutes.route(this.app);
      this.connectDB();
   }
   private middleWare(): void {
         // support application/json type post data
         this.app.use(bodyParser.json());
         //support application/x-www-form-urlencoded post data
         this.app.use(helmet());
         this.app.use(cors());
         this.app.use(bodyParser.urlencoded({ extended: false }));
      }

   private connectDB = async() => {
      dotenv.config();
      await connect(process.env.MONGODBURL, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      }).then(()=>{
         console.log("Mongo Db connected");
      }).catch((err)=>{
         console.log(err);
      });
   }
}
export default new App().app;
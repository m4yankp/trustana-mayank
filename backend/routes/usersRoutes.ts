import {Application, Request, Response } from 'express';
import { Users } from '../controllers/users';
import { AuthController } from "../controllers/auth";

// Users Routes
export class UserRoutes {
   public user: Users = new Users();
   public auth: AuthController = new AuthController();

   public route(app: Application) {
      app.post('/api/user', this.user.validateData, this.user.post);
      app.get('/api/myData', this.auth.checkLogin, this.user.getDecryptedData);
      app.get('/api/getPublicData',this.auth.checkPublicAccess,this.user.getDataForPublic);
   }
}
import {Application, Request, Response } from 'express';
import { Users } from '../controllers/users';
import { AuthController } from "../controllers/auth";
import { uploadSingleFile } from "../utils/fileUpload";

// Users Routes
export class UserRoutes {
   public user: Users = new Users();
   public auth: AuthController = new AuthController();

   public route(app: Application) {
      app.post('/api/user', uploadSingleFile, this.user.validateData, this.user.post);
      app.post('/api/myData', this.auth.checkLogin, this.user.getDecryptedData);
      app.get('/api/getPublicData',this.auth.checkPublicAccess,this.user.getDataForPublic);
      app.get('/api/decryptedFilePublic/:token',this.auth.checkFileToken,this.user.getDecryptedFile);
   }
}
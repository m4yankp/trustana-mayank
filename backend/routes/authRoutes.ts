import {Application } from 'express';
import { AuthController } from '../controllers/auth';

// Authorization Routes for creating tokens
export class AuthRoutes {
   public auth: AuthController = new AuthController();
   public route(app: Application) {
        app.post('/api/auth', AuthController.login);
        app.post('/api/createTemporaryToken',this.auth.checkLogin, this.auth.createTemporaryToken);
   }
}
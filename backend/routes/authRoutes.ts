import {Application, Request, Response } from 'express';
import { AuthController } from '../controllers/auth';
export class AuthRoutes {
   public auth: AuthController = new AuthController();
   public route(app: Application) {
      app.post('/api/auth', AuthController.login);
   }
}
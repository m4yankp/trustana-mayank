import {Application, Request, Response } from 'express';
import { Users } from '../controllers/users';

export class UserRoutes {
   public user: Users = new Users();

   public route(app: Application) {
      app.post('/api/user', this.user.validateData, this.user.post);
      app.get('/api/user', this.user.getAll);
      app.get('/api/jwt',this.user.createToken);
   }
}
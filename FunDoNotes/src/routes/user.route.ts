import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

class UserRoutes {
  private UserController = new userController();
  private router = express.Router();
  private UserValidator = new userValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
 //route to create a new user
 this.router.post( '/register',  this.UserValidator.registervalidator, this.UserController.registerUser);

       // route to create a new user
       this.router.post( '/login',  this.UserValidator.loginvalidator, this.UserController.loginUser);

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;

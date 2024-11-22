import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';
import { Auth, passwordResetAuth } from '../middlewares/auth.middleware';

class UserRoutes {
  private UserController = new userController();
  private router = express.Router();
  private UserValidator = new userValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {

         //route to create a new user
        this.router.post('',this.UserValidator.registervalidator, this.UserController.registerUser);

        // route to create a new user
        this.router.post( '/login',this.UserValidator.loginvalidator, this.UserController.loginUser);

        //route to implement forgot password
        this.router.post('/forgot-password',this.UserValidator.emailValidator, this.UserController.forgetPassword);

        //route to implement reset password
        this.router.put('/reset-password',this.UserValidator.resetPasswordValidator,passwordResetAuth, this.UserController.resetPassword);

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;

/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import UserService from '../services/user.service';
import { sendEmail } from '../utils/user.util';
import { Request, Response, NextFunction } from 'express';

class UserController {
  public userService = new UserService();

  /**
   * Controller to register a new user
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {Function} next - Next function to handle errors
   */

  //Register user
  public registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const newUser = await this.userService.registerUser(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: newUser,
        message: 'User registered successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  // Log in user
  public loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const user = await this.userService.loginUser(req.body);
      return res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: user,
        message: 'Login successful'
      });
    } catch (error) {
      next(error);
    }
  };

  // Forget password
  public forgetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { email } = req.body;
      const token = await this.userService.forgetPassword(email);
      // Sending token via email
      await sendEmail(email, token);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'Reset token sent to email successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  // Reset password
  public resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      await this.userService.resetPassword(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'Password reset successfully'
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;

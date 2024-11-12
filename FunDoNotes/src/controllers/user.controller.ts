/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import UserService from '../services/user.service';

import { Request, Response, NextFunction } from 'express';

class UserController {
  public userService = new UserService();

    /**
   * Controller to register a new user
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {Function} next - Next function to handle errors
   */
    public registerUser = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        // Call the UserService to create a new user with the provided data
        const newUser = await this.userService.registerUser(req.body);
  
        // Respond with the newly created user data and a success message
        res.status(HttpStatus.CREATED).json({
          code: HttpStatus.CREATED,
          data: newUser,
          message: 'User registered successfully'
        });
      } catch (error) {
        // Pass any error to the next middleware for centralized error handling
        next(error);
      }
    };


//---------------------------------------------------------------------------------------------------

   // Log in user
   public loginUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const user= await this.userService.loginUser(req.body);
      return res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: user, // Return the user and token
        message: 'Login successful'
      });
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).send(error.message);
    }
};

//-------------------------------------------------------------------------------------------------------

}

export default UserController;

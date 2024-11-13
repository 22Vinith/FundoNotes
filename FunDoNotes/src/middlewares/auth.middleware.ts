/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const jwtSecret = process.env.JWT_SECRET;


export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction)
: Promise<void> => {
  try {
    let bearerToken = req.header('Authorization');
    console.log("bearerToken"+ bearerToken);
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const decodedToken: any = jwt.verify(bearerToken, jwtSecret);
    console.log('Decoded token:', decodedToken.userId); 

    req.body.createdBy=decodedToken.userId
    console.log("req.body contains "+ req.body.createdBy)
    next();
  } catch (error) {
    next(error);
  }
};



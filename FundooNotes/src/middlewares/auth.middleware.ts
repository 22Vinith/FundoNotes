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

const userAuth = (jwtSecret: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let bearerToken = req.header('Authorization');
      if (!bearerToken)
        throw {
          code: HttpStatus.BAD_REQUEST,
          message: 'Authorization token is required'
        };
      bearerToken = bearerToken.split(' ')[1];
      const decodedToken: any = jwt.verify(bearerToken, jwtSecret);
      req.body.createdBy = decodedToken.userId;
      next();
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid or expired token' });
    }
  };
};

export const Auth = userAuth(process.env.JWT_SECRET);

export const passwordResetAuth = userAuth(process.env.JWT_SECRETF);

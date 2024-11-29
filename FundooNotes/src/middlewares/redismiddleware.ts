import { Request, Response, NextFunction } from 'express';
import {redisClient} from '../config/redis';
import HttpStatus from 'http-status-codes';

export const cacheNotes = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.createdBy;
  try {
    const cachedNotes = await redisClient.get(`notes:${userId}`);
    if (cachedNotes) {
      return res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: JSON.parse(cachedNotes),
        message: 'Notes fetched successfully from cache',
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};


export const cacheNoteById = async (req: Request, res: Response, next: NextFunction) => {
    const noteId = req.params.id;
    const userId = req.body.createdBy;
    try {
      const cachedNote = await redisClient.get(`note:${userId}:${noteId}`);
      if (cachedNote) {
        return res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: JSON.parse(cachedNote),
          message: 'Note fetched successfully from cache',
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
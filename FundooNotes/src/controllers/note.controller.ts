import { Request, Response, NextFunction } from 'express';
import noteService from '../services/note.services';
import HttpStatus from 'http-status-codes';
import { redisClient } from '../config/redis';

class NoteController {
  private noteService = new noteService();

  // Create a new note
  public createNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.body.createdBy;
      const data = await this.noteService.createNote(req.body, userId);

      // Invalidate cache for user notes
      await redisClient.del(`notes:${userId}`);

      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data,
        message: 'Note created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  // Controller to get all notes for a user
  public getAllNotes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.body.createdBy;
      const data = await this.noteService.getAllNotes(userId);
      if (data.length === 0) {
        res.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          message: 'No notes present for the user'
        });
      }
      await redisClient.setEx(`notes:${userId}`, 3600, JSON.stringify(data));

      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data,
        message: 'Notes fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  // Controller to get a note by its ID
  public getNoteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const noteId = req.params.id;
      const userId = req.body.createdBy;

      const data = await this.noteService.getNoteById(noteId, userId);
      if (!data) {
        res.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          message: 'Note not found'
        });
        return;
      }
      await redisClient.setEx(`note:${userId}:${noteId}`, 3600, JSON.stringify(data));

      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data,
        message: 'Note fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  // Update a note
  public updateNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.body.createdBy;
      const noteId = req.params.id;

      const data = await this.noteService.updateNote(noteId, req.body, userId);

      // Invalidate cache for user notes and specific note
      await redisClient.del(`notes:${userId}`);
      await redisClient.del(`note:${userId}:${noteId}`);

      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data,
        message: 'Note updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  // Toggle archive status
  public ArchiveNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.body.createdBy;
      const noteId = req.params.id;

      const data = await this.noteService.toggleArchive(noteId, userId);

      // Invalidate cache for user notes and specific note
      await redisClient.del(`notes:${userId}`);
      await redisClient.del(`note:${userId}:${noteId}`);

      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data,
        message: 'Note archive status toggled successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  // Toggle trash status
  public TrashNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.body.createdBy;
      const noteId = req.params.id;

      const data = await this.noteService.toggleTrash(noteId, userId);

      // Invalidate cache for user notes and specific note
      await redisClient.del(`notes:${userId}`);
      await redisClient.del(`note:${userId}:${noteId}`);

      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data,
        message: 'Note trash status toggled successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  // Permanently delete a note
  public deleteNoteForever = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.body.createdBy;
      const noteId = req.params.id;

      await this.noteService.deleteNoteForever(noteId, userId);

      // Invalidate cache for user notes and specific note
      await redisClient.del(`notes:${userId}`);
      await redisClient.del(`note:${userId}:${noteId}`);

      res.status(HttpStatus.NO_CONTENT).json({
        code: HttpStatus.NO_CONTENT,
        message: 'Note deleted permanently'
      });
    } catch (error) {
      next(error);
    }
  };
}

export default NoteController;

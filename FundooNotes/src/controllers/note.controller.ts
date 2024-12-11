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

// Controller to get all notes for a user with pagination
public getAllNotes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.body.createdBy;

    // Extract pagination parameters with defaults
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 3;

    // Validate page and limit
    if (page <= 0 || limit <= 0) {
        res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: 'Page and limit must be positive integers.',
      });
    }

    // Calculate the skip value
    const skip = (page - 1) * limit;

    // Fetch paginated notes and total count from the service
    const { notes, totalRecords } = await this.noteService.getAllNotes(userId, skip, limit);

    // If no notes are found, respond early
    if (notes.length === 0) {
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'No notes present for the user',
      });
    }

    // Cache the results in Redis
    try {
      await redisClient.setEx(`notes:${userId}:page:${page}`, 3600, JSON.stringify(notes));
    } catch (redisError) {
      console.error('Redis caching error:', redisError);
    }

    // Calculate total pages
    const totalPages = Math.ceil(totalRecords / limit);

    // Respond with paginated data
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: notes,
      meta: {
        page,
        limit,
        totalRecords,
        totalPages,
      },
      message: 'Notes fetched successfully',
    });
  } catch (error) {
    next(error); // Pass the error to the generic error handler
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

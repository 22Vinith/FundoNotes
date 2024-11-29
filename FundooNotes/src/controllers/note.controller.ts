import { Request, Response, NextFunction } from 'express';
import noteService from '../services/note.services';
import HttpStatus from 'http-status-codes';
import { INote } from '../interfaces/note.interface';
import { redisClient } from '../config/redis';

class NoteController {
  private noteService = new noteService();

  // Create a new note
  public createNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<INote> => {
    try {
      const userId = req.body.createdBy;
      const data = await this.noteService.createNote(req.body, userId);

      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Note created successfully'
      });
      return data;
    } catch (error) {
      next(error);
    }
  };

  // Controller to get all notes for a user
  public getAllNotes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.body.createdBy; // Extract the user ID from the request body
    // Check if notes are cached in Redis
    const cachedNotes = await redisClient.get(`notes:${userId}`);
    if (cachedNotes) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: JSON.parse(cachedNotes),
        message: 'Notes fetched successfully from cache'
      });
    }
    // Fetch notes from the database
    const data = await this.noteService.getAllNotes(userId);
    if (data.length === 0) {
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'No notes present for the user'
      });
    }
    // Cache the fetched notes in Redis for 1 hour
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
  public updateNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<INote> => {
    try {
      const userId = req.body.createdBy;
      const data = await this.noteService.updateNote(
        req.params.id,
        req.body,
        userId
      );
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Note updated successfully'
      });
      return data;
    } catch (error) {
      next(error);
    }
  };

  // Toggle archive status
  public ArchiveNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<INote> => {
    try {
      const userId = req.body.createdBy;
      const data = await this.noteService.toggleArchive(req.params.id, userId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Note archive status toggled successfully'
      });
      return data;
    } catch (error) {
      next(error);
    }
  };

  // Toggle trash status
  public TrashNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<INote> => {
    try {
      const userId = req.body.createdBy;
      const data = await this.noteService.toggleTrash(req.params.id, userId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Note trash status toggled successfully'
      });
      return data;
    } catch (error) {
      next(error);
    }
  };

  // Permanently delete a note
  public deleteNoteForever = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<null> => {
    try {
      const userId = req.body.createdBy;
      await this.noteService.deleteNoteForever(req.params.id, userId);
      res.status(HttpStatus.NO_CONTENT).json({
        code: HttpStatus.NO_CONTENT,
        message: 'Note deleted permanently'
      });
      return null;
    } catch (error) {
      next(error);
    }
  };
}

export default NoteController;

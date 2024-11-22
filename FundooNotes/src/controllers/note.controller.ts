import { Request, Response, NextFunction } from 'express';
import noteService from '../services/note.services';
import HttpStatus from 'http-status-codes';
import { http } from 'winston';



class NoteController {
    private noteService = new noteService();

    // Create a new note
    public createNote = async (
    req: Request,
    res: Response,
    next: NextFunction
    ): Promise<any> => {
    try {
      const userId = req.body.createdBy;
      console.log("Controller userId contains " + userId);
      const data = await this.noteService.createNote(req.body, userId);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: "Note created successfully"
      });
    } catch (error) {
      next(error);
    }
    };
  


    // Get all notes
    public getAllNotes = async (
    req: Request,
    res: Response,
    next: NextFunction
    ): Promise<any> => {
    try {
      const userId = req.body.createdBy;
      const data = await this.noteService.getAllNotes(userId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: "All notes fetched successfully"
      });
    } catch (error) {
      next(error); 
    }
    };


    // Get a single note by ID
    public getNoteById = async (
    req: Request,
    res: Response,
    next: NextFunction
    ): Promise<any> => {
    try {
      const userId = req.body.createdBy;
      const data = await this.noteService.getNoteById(req.params.id, userId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: "Note fetched successfully"
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
    ): Promise<any> => {
    try {
      const userId = req.body.createdBy;
      const data = await this.noteService.updateNote(req.params.id, req.body, userId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: "Note updated successfully"
      });
    } catch (error) {
      next(error); 
    }
    };


    // Toggle archive status
    public ArchiveNote = async (
    req: Request,
    res: Response,
    next: NextFunction
    ): Promise<any> => {
    try {
      const userId = req.body.createdBy;
      const data = await this.noteService.toggleArchive(req.params.id, userId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: "Note archive status toggled successfully"
      });
    } catch (error) {
      next(error); 
    }
    };


    // Toggle trash status
    public TrashNote = async (
    req: Request,
    res: Response,
    next: NextFunction
    ): Promise<any> => {
    try {
      const userId = req.body.createdBy;
      const data = await this.noteService.toggleTrash(req.params.id, userId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: "Note trash status toggled successfully"
      });
    } catch (error) {
      next(error); 
    }
    };


    // Permanently delete a note
    public deleteNoteForever = async (
    req: Request,
    res: Response,
    next: NextFunction
    ): Promise<any> => {
    try {
      const userId = req.body.createdBy;
      await this.noteService.deleteNoteForever(req.params.id, userId);
      res.status(HttpStatus.NO_CONTENT).json({
        code: HttpStatus.NO_CONTENT,
        message: "Note deleted permanently"
      });
    } catch (error) {
      next(error); 
    }
    };


}

export default NoteController;

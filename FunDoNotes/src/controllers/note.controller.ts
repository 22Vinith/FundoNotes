import { Request, Response } from 'express';
import noteService from '../services/note.services';
import { userAuth } from '../middlewares/auth.middleware';


class NoteController {
  private noteService = new noteService();

  // Create a new note
  public createNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const UserId= res.locals.user.userId;
        console.log(UserId)
      const note = await this.noteService.createNote(req.body, UserId );
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

   // Get all notes
   public getAllNotes = async (req: Request, res: Response): Promise<void> => {
    try {
        const UserId= res.locals.user.userId;
       
      const notes = await this.noteService.getAllNotes(UserId);
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get a single note by ID
  public getNoteById = async (req: Request, res: Response): Promise<void> => {
    try {
        const UserId= res.locals.user.userId;
      const note = await this.noteService.getNoteById(req.params.id, UserId );
      res.status(200).json(note);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

}

export default NoteController;

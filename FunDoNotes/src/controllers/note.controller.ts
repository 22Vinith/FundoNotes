import { Request, Response } from 'express';
import noteService from '../services/note.services';
import { userAuth } from '../middlewares/auth.middleware';


class NoteController {
  private noteService = new noteService();
//----------------------------------------------------------------------------------------------------
    // Create a new note
    public createNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const UserId= req.body.createdBy;
        console.log("controller userId contains"+UserId)
      const note = await this.noteService.createNote(req.body, UserId );
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    };

//----------------------------------------------------------------------------------------------------
    // Get all notes
    public getAllNotes = async (req: Request, res: Response): Promise<void> => {
    try {
        const UserId= req.body.createdBy;
       
      const notes = await this.noteService.getAllNotes(UserId);
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    };

//----------------------------------------------------------------------------------------------------
    // Get a single note by ID
    public getNoteById = async (req: Request, res: Response): Promise<void> => {
    try {
        const UserId= req.body.createdBy;
      const note = await this.noteService.getNoteById(req.params.id, UserId );
      res.status(200).json(note);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    };

//----------------------------------------------------------------------------------------------------
    // Update a note
    public updateNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const UserId= req.body.createdBy;
      const updatedNote = await this.noteService.updateNote(req.params.id, req.body, UserId);
      res.status(200).json(updatedNote);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    };

//----------------------------------------------------------------------------------------------------
    // Toggle archive status
    public ArchiveNote = async (req: Request, res: Response): Promise<void> => {
        try {
            const UserId= req.body.createdBy;
          const archivedNote = await this.noteService.toggleArchive(req.params.id, UserId);
          res.status(200).json(archivedNote);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    };

//----------------------------------------------------------------------------------------------------
    // Toggle trash status
    public TrashNote = async (req: Request, res: Response): Promise<void> => {
    try {
        const UserId= req.body.createdBy;
      const trashedNote = await this.noteService.toggleTrash(req.params.id, UserId);
      res.status(200).json(trashedNote);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    };

//----------------------------------------------------------------------------------------------------
    // Permanently delete a note
    public deleteNoteForever = async (req: Request, res: Response): Promise<void> => {
    try {
        const UserId= req.body.createdBy;
      await this.noteService.deleteNoteForever(req.params.id, UserId);
      res.status(204).json({message: "deleted permanently"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    };

//----------------------------------------------------------------------------------------------------
}

export default NoteController;

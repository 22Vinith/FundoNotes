import express, { IRouter } from 'express';
import noteController from '../controllers/note.controller';
import noteValidator from '../validators/note.validator';
import { Auth } from '../middlewares/auth.middleware';
import { cacheNotes, cacheNoteById } from '../middlewares/redismiddleware';

class noteRoutes {
  private NoteController = new noteController();
  private router = express.Router();
  private NoteValidator = new noteValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    
    // Route to create a new note
    this.router.post( '', Auth, this.NoteValidator.validateNote, this.NoteController.createNote);

    // Route to get all Notes of a user
    this.router.get('/', Auth,cacheNotes, this.NoteController.getAllNotes);

    // Route to get a note by its ID
    this.router.get('/:id', Auth, cacheNoteById , this.NoteController.getNoteById);

    // Route to update a note
    this.router.put('/:id/update',Auth,this.NoteValidator.validateNote,this.NoteController.updateNote );

    // Route to toggle archive/unarchive
    this.router.put('/:id/archive',Auth,this.NoteValidator.validateNote,this.NoteController.ArchiveNote);

    // Route to toggle trash/restore
    this.router.put( '/:id/trash', Auth, this.NoteValidator.validateNote, this.NoteController.TrashNote);

    // Route to permanently delete a note
    this.router.delete('/:id/delete',Auth,this.NoteValidator.validateNote,this.NoteController.deleteNoteForever);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}
export default noteRoutes;

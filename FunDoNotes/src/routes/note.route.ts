import express, { IRouter } from 'express';
import noteController from '../controllers/note.controller';
import noteValidator from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

class noteRoutes {
  private NoteController = new noteController();
  private router = express.Router();
  private NoteValidator = new noteValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {

   // Route to create a new note
   this.router.post('/create', userAuth, this.NoteValidator.validateNote, this.NoteController.createNote);

  // Route to get all Notes of a user
  this.router.get('/', userAuth, this.NoteController.getAllNotes);

 // Route to get a note by its ID
 this.router.get('/:id', userAuth, this.NoteController.getNoteById);

    // Route to update a note
    this.router.put('/update/:id', userAuth, this.NoteValidator.validateNote, this.NoteController.updateNote);

       // Route to toggle archive/unarchive
   this.router.put('/archive/:id', userAuth, this.NoteController.ArchiveNote);

      // Route to toggle trash/restore
   this.router.put('/trash/:id', userAuth, this.NoteController.TrashNote);

      // Route to permanently delete a note
   this.router.delete('/delete/:id', userAuth, this.NoteController.deleteNoteForever);

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default noteRoutes;
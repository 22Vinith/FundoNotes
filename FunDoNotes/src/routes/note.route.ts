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
  
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default noteRoutes;
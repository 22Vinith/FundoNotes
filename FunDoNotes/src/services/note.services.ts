import NoteModel from '../models/note.model';
import { INote } from '../interfaces/note.interface';

class NoteService {
  // Create a new note
  public async createNote(noteData: INote, userId: string): Promise<INote> {
    return await NoteModel.create({ ...noteData, createdBy: userId });
  }

      // Get all notes
      public async getAllNotes(userId: string): Promise<INote[]> {
        return await NoteModel.find({ createdBy: userId });
      }

}

export default NoteService;

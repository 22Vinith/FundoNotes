import NoteModel from '../models/note.model';
import { INote } from '../interfaces/note.interface';

class NoteService {
  // Create a new note
  public async createNote(noteData: INote, userId: string): Promise<INote> {
    return await NoteModel.create({ ...noteData, userId });
  }

  // Get all notes
  public async getAllNotes(userId: string): Promise<INote[]> {
    return await NoteModel.find({ createdBy: userId });
  }

  // Get note by ID
  public async getNoteById(noteId: string, userId: string): Promise<INote | null> {
    return await NoteModel.findOne({ _id: noteId, createdBy: userId });
  }

  // Update a note
  public async updateNote(noteId: string, noteData: INote, userId: string): Promise<INote | null> {
    return await NoteModel.findOneAndUpdate({ _id: noteId, createdBy: userId }, noteData, { new: true });
  }

  // Toggle archive status
  public async toggleArchive(noteId: string, userId: string): Promise<INote | null> {
    const note = await NoteModel.findOne({ _id: noteId, createdBy: userId });
    if (note) {
      note.isArchive = !note.isArchive;
      await note.save();
    }
    return note;
  }

  // Toggle trash status
  public async toggleTrash(noteId: string, userId: string): Promise<INote | null> {
    const note = await NoteModel.findOne({ _id: noteId, createdBy: userId });
    if (note) {
      note.isTrash = !note.isTrash;
      await note.save();
    }
    return note;
  }

  // Permanently delete a note
  public async deleteNoteForever(noteId: string, userId: string): Promise<void> {
    await NoteModel.findOneAndDelete({ _id: noteId, createdBy: userId });
  }
}

export default NoteService;

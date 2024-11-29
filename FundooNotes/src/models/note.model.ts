import Mongoose, { Schema, model } from 'mongoose';
import { INote } from '../interfaces/note.interface';

const noteSchema = new Schema(
  {
    title: {
      type: String
    },
    description: {
      type: String
    },
    color: {
      type: String
    },

    isArchive: {
      type: Boolean
    },
    isTrash: {
      type: Boolean
    },
    createdBy: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default model<INote>('user', noteSchema);

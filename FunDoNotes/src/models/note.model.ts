import Mongoose, {Schema, model } from 'mongoose';
import { INote } from '../interfaces/note.interface';
import { boolean } from '@hapi/joi';

const noteSchema = new Schema(
    {
      title:{
        type:String
      },
      description:{
        type:String
      },
     color : {
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
       ref: 'User'
      }
    },
    {
      timestamps: true
    }
  );
  
  export default model<INote>('user', noteSchema);
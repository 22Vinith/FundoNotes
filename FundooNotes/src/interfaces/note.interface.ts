import { Document } from 'mongoose';

export interface INote extends Document  {
  title:String
  description:String
  color: String
  isArchive: boolean
  isTrash: boolean
  createdBy: String
}

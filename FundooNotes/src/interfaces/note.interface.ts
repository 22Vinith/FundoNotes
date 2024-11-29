import { Document } from 'mongoose';

export interface INote extends Document {
  title: string;
  description: string;
  color: string;
  isArchive: boolean;
  isTrash: boolean;
  createdBy: string;
}

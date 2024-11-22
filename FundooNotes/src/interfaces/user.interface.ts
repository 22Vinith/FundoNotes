import { Document } from 'mongoose';

export interface IUser extends Document  {
  firstname:String
  lastname:String
  email: string
  password: string
}

import { Document } from 'mongoose';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface IUserResponse {
  message: string;
  token?: string;
}

export interface ResetPasswordBody {
  createdBy: string; // Assuming createdBy is a string (user ID)
  newPassword: string; // Assuming newPassword is a string
}

import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from 'jsonwebtoken';

dotenv.config();



class UserService {

  // private jwtSecret = process.env.JWT_SECRET;

  public registerUser= async (body:IUser): Promise<any> =>{
    // Step 1: Check if a user already exists by email
    const existingUser = await User.findOne({email: body.email});
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }
      

    // Step 2: Add the new user to the in-memory "database"
    const newUser = await User.create(body);

    // Step 3: Return the newly created user object
    return newUser;
  }
}

export default UserService;

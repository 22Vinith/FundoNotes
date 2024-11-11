import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import bcrypt from "bcrypt"
import dotenv from "dotenv"
// import jwt from 'jsonwebtoken';

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

// Log in user
public loginUser = async (body: { email: string; password: string }): Promise<any> => {
  const { email, password } = body;

  // Check if user exists
  const user = await User.findOne({email} );//Internally the return is made, If a matching user is found, User.findOne "returns an object with that user’s data".
  if (!user) {  //This is entered only if the above is false
    console.log("hello")      
    throw new Error('Invalid email or password');
  }

    // Correct password verification using bcrypt(Authentication)
    const isPasswordValid = await bcrypt.compare(password, user.password);// Even this has the return stmt internally for true, the "user" in the user.password is the one which is mentioned while retreving the email which return the entire object of that matched email.
    if (!isPasswordValid) { //Same here 
      console.log("Incorrect password");
      throw new Error('Invalid email or password');
    }

return 
};


}

export default UserService;

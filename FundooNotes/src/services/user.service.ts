import User from '../models/user.model';
import { IUser, IUserResponse, ResetPasswordBody } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

class UserService {
  private jwtSecret = process.env.JWT_SECRET;

  //Register user
  public registerUser = async (body: IUser): Promise<IUser> => {
    // Step 1: Check if a user already exists by email
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(body.password, salt);
    body.password = hash;
    const newUser = await User.create(body);
    return newUser;
  };

  // Log in user
  public loginUser = async (body: { email: string; password: string }): Promise<IUserResponse> => {
    const { email, password } = body;
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email');
    }
    // Correct password verification using bcrypt(Authentication)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, this.jwtSecret, { expiresIn: '1h' });
    return { message: 'Login successful', token };
  };

  // Forget password service
  public forgetPassword = async (email: string): Promise<string> => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETF as string);
    return token;
  };

  // Reset password service
  public resetPassword = async (body: ResetPasswordBody): Promise<void> => {
    const user = await User.findById({ _id: body.createdBy });
    if (!user) {
      throw new Error('Invalid user');
    }
    const hashedPassword = await bcrypt.hash(body.newPassword, 10);
    user.password = hashedPassword;
    await user.save();
  };
}

export default UserService;

import  User from "../DB/Model/user.model";
import { IUser } from "../DB/Types/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApplicationError  from "../Errors/appliction-error";

export const saveUser = async (userData: IUser) => {

  const user = new User(userData);

  user.password = await bcrypt.hash(user.password, 12);

  const savedUser = await user.save();

  return savedUser;
};

const getSecret = () => process.env.JWT_SECRET ?? "secret";

const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApplicationError(401, "Email or Password is incorrect");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new ApplicationError(401, "Email or Password is incorrect");

  return jwt.sign({ email, id: user._id, isAdmin: user.isAdmin }, getSecret());
};

const updateUser = async (userId: string, userData: IUser): Promise<IUser | null> => {
  try {
      const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true }).exec();
      return updatedUser;
  } 
  catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Error updating user');
  }
};

export const userService = { saveUser, login, updateUser, };


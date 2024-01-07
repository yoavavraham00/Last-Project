import { model } from 'mongoose';
import { userSchema } from '../Schema/User/user.schema';

const User = model("User", userSchema); // create a model from the schema

export default User; 

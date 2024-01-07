import { Schema } from 'mongoose'; // import Schema from mongoose
import  { IRole }  from '../Types/models';


const roleSchema = new Schema<IRole>({ 
    name: {type: String, unique: true, required: false, default: "user"}, 
}); // create a new schema

export default roleSchema; // export the schema
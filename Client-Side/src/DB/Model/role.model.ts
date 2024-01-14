import  roleSchema  from '../Schema/role.schema'; 
import { model } from 'mongoose'; 

const IRole = model("Role", roleSchema); // create a model from the schema

export default IRole; 
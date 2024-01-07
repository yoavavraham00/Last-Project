import Joi from "joi";
import { IUserUpdate } from "../DB/Types/db";
 

const schema = Joi.object<IUserUpdate>({
  isBusiness: Joi.boolean(),
});

export { schema as joiUpdateUserSchema };
export default schema;
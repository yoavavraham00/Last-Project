import Joi from "joi";
import { ICardUpDate } from "../DB/Types/db";
 

const schema = Joi.object<ICardUpDate>({
    likes: Joi.array().items(Joi.string())
});


// const schema = Joi.object({
//   likes: Joi.array().items(Joi.string())
//   });

  export { schema as joiUpdateCardSchema };
export default schema;
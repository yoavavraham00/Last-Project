import { RequestHandler } from "express"
import joiUserSchema  from "../../Validators/user.joi"
import joiCardSchema  from "../../Validators/card.joi"
import joiLoginSchema from "../../Validators/Common/login.joi"
import Joi from "joi"
import { joiUpdateUserSchema } from "../../Validators/userUpDate.joi"
import { joiUpdateCardSchema } from "../../Validators/cardUpDate.joi"

type ValidateSchema = (schema: Joi.ObjectSchema) => RequestHandler;

const validateSchema: ValidateSchema =
  (schema) => async (req, res, next) => {
    try {  //check validation
      await schema.validateAsync(req.body); 
      next(); //if all is good - pass to the next route
    } catch (e) { 
      console.log(e.message)
      return res.status(400).json(e);  //if validation failed throw an error - bad request
    }
  };

  export const validateUser = validateSchema(joiUserSchema);
  export const validateCard = validateSchema(joiCardSchema);
  export const validateLogin = validateSchema(joiLoginSchema);
  export const validateUserUpdate = validateSchema(joiUpdateUserSchema); 
  export const validateCardUpdate = validateSchema(joiUpdateCardSchema); 
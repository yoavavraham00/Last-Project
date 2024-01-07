import Joi from 'joi';
import { ILogin } from "../../DB/Types/models"
import { patterns } from './regex-patterns';

const joiLoginSchema = Joi.object({
    email: Joi.string().email().required().min(7).max(20),
    password: Joi.string()
    .pattern(patterns.password)
    .max(20)
    .required(),
}); 

export default joiLoginSchema;
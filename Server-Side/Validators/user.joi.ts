import Joi from "joi";
import { IAddress, IImage, IName, IUser } from "../DB/Types/models";
import { patterns } from "./Common/regex-patterns";

const joiUserSchema = Joi.object<IUser>({
  //rules for validation
  email: Joi.string().email().min(5).max(30).required(),
  password: Joi.string().pattern(patterns.password).min(8).max(30).required(),
  isBusiness: Joi.boolean().required(),
  phone: Joi.string().pattern(patterns.phone).min(9).max(11).required(),
  name: Joi.object<IName>({
    first: Joi.string().min(2).max(256).required(),
    middle: Joi.string().min(0).max(256).optional(),
    last: Joi.string().min(2).max(256).required(),
  }),
  address: Joi.object<IAddress>({
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    state: Joi.string().min(0).max(256).optional(),
    zip: Joi.number().required(),
    // TODO: Check with jhonatan if zip is required
    houseNumber: Joi.number().required(),
  }),
  image: Joi.object<IImage>({
    alt: Joi.string().min(0).max(256),
    // TODO: Check with jhonatan about url (we want to limit the max for all strings)
    url: Joi.string().uri().min(14).max(256),
  }),
});
export default joiUserSchema;

import Joi from "joi";
import { ICard, IAddress, IImage } from "../DB/Types/models";
import { patterns } from "./Common/regex-patterns";

const joiCardsSchema = Joi.object<ICard>({
  title: Joi.string().required().min(2).max(256),
  subtitle: Joi.string().required().min(2).max(256),
  description: Joi.string().required().min(2).max(1024),
  phone: Joi.string().required().min(9).max(11).pattern(patterns.phone),
  email: Joi.string().email().required().min(5).max(30),
  web: Joi.string().uri().required().min(5).max(256),
  image: Joi.object<IImage>({
    url: Joi.string().min(5).max(256),
    alt: Joi.string().max(256),
  }),
  address: Joi.object<IAddress>({
    state: Joi.string().min(2).max(256),
    country: Joi.string().required().min(2).max(256),
    city: Joi.string().required().min(2).max(256),
    street: Joi.string().required().min(2).max(256),
    houseNumber: Joi.number().required().min(1).max(1000),
    zip: Joi.number().required().min(10000).max(9999999999),
  }), //TODO: check if the zipcode is rerquired
});

export default joiCardsSchema;

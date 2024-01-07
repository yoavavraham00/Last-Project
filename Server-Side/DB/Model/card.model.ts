import { model } from 'mongoose';
import cardSchema from '../Schema/Card/card.schema';

const Card = model("Card", cardSchema); // create a model from the schema

export default Card;
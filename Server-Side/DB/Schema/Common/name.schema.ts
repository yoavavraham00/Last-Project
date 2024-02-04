import { Schema } from 'mongoose';
import { IName } from '../../Types/models';

export const nameSchema = new Schema<IName>({
    first: {type: String, required: true, minlength: 2, maxlength: 25},
    middle: {type: String, required: false, minlength: 0, maxlength: 20},
    last: {type: String, required: true, minlength: 2, maxlength: 25},
}); // add the name schema to the mongoose schema
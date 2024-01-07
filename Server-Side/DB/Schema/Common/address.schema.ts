import { Schema } from 'mongoose';
import { IAddress } from '../../Types/models';

export const addressSchema = new Schema<IAddress>({
    state: {type: String, required: false, maxlength: 25},
    country: {type: String, required: true, maxlength: 25, default: ""},
    city: {type: String, required: true, maxlength: 25},
    street: {type: String, required: true, maxlength: 40},
    houseNumber: {type: Number, required: true, maxlength: 10},
    zip: {type: Number, required: false, maxlength: 10, default: 0},
}); // add the address schema to the mongoose schema
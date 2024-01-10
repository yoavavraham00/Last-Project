import { Schema } from 'mongoose';
import { ICard } from '../../Types/models';
import { imageSchema } from '../Common/Image.schema';
import { addressSchema } from '../Common/address.schema';

const cardSchema = new Schema<ICard>({
    title: {type: String, required: true, minlength: 2, maxlength: 256},
    subtitle: {type: String, required: false, minlength: 2, maxlength: 256},
    description: {type: String, required: true, minlength: 2, maxlength: 1024},
    phone: {type: String, required: true, minlength: 9, maxlength: 11},
    email: {type: String, required: true, minlength: 5, maxlength: 30}, // TODO: talk with the team about the email max string length
    web: {type: String, required: false, minlength: 14, maxlength: 50},
    image: {type: imageSchema, required: true},
    address: {type: addressSchema, required: true},
    bizNumber: {type: Number, unique: true, required: false, default: ()=>{
        return Math.floor(Math.random() * 1000000000);
    }}, //make a rendum number for the bizNumber
    likes: {type: [String], required: false, default: []},
    createdAt: {type: Date, required: true, default: Date.now},
    user_id: {type: Schema.Types.ObjectId, ref: "User", required: true}
});

export default cardSchema;
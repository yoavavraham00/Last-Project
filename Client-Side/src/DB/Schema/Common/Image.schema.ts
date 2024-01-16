import { Schema } from 'mongoose';
import { IImage } from '../../Types/models.d';

export const imageSchema = new Schema<IImage>({
    url: {type: String, required: false, default: "https://picsum.photos/200/300", maxlength: 100},
    alt: {type: String, required: false, default: "user avatar", maxlength: 100},
}); // add the Image schema to the mongoose schema
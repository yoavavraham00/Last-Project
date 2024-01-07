import { Schema } from "mongoose";
import { IUser } from "../../Types/models";
import { addressSchema } from "../Common/address.schema";
import { nameSchema } from "../Common/name.schema";
import { imageSchema } from "../Common/Image.schema";

export const userSchema = new Schema<IUser>({
  name: {type: nameSchema, required: true},
  address: {type: addressSchema, required: true},
  image: {type: imageSchema, required: false,default: {
    url: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
  }},
  email: {type: String, required: true, maxlength: 100, unique: true},
  isBusiness: {type: Boolean, required: false, default: false},
  isAdmin: {type: Boolean, required: false, default: false},
  password: {type: String, required: true, maxlength: 1024},
  phone: {type: String, required: true, maxlength: 100},
});
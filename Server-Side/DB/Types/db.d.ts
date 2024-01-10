import { IUser } from "./db.d";
import mongoose, { Date } from "mongoose";
import { type } from "os";

export type IRole = {
  name: string;
}; //Roles: "admin"|"user"|"moderator"|"VIP"|"bussiness"

export type IName = {
  first: string;
  middle: string;
  last: string;
};

export type IAddress = {
  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
  zip?: number;
};

export type IImage = {
  url: string;
  alt: string;
};

export type IUser = {
  name: IName;
  isBusiness: boolean;
  phone: string;
  email: string;
  password: string;
  image: IImage;
  address: IAddress;
  isAdmin?: boolean;
};

export type ICardInput = {
  title: string;
  subtitle: string;
  description: string;
  phone: string;
  email: string;
  web: string;
  image: IImage;
  address: IAddress;
};

export type ICard = ICardInput & {
  bizNumber: number;
  likes: string[];
  user_id: mongoose.Types.ObjectId;
  createdAt: Date;
};

export type ILogin = {
  email: string;
  password: string;
};

export type IUserUpdate = {
  isBusiness: boolean;
};

export type ICardUpDate = {
  likes: string[];
}
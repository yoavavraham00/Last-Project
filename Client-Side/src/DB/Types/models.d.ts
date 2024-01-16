import mongoose, { mongo } from "mongoose";
import user from './../Model/user.model';

export type IRole ={
    name: string;
    description: string;
}

export type IName = {
    first: string;
    middle?: string;
    last: string;
}

export type IAddress = {
    state?: string;
    country: string;
    city: string;
    street: string;
    houseNumber: Number;
    zip?: Number;
}

export type IImage = {
    url?: string;
    alt?: string;
}

export type IUser = {
    name: IName;
    isBusiness: boolean;
    phone: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    address: IAddress;
    image: IImage; 
}

export type ICardInput = {
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string,
    web: string;
    image: IImage;
    address: IAddress;
}

export type ICard = ICardInput & {
    bizNumber: number;
    likes?: string[];
    _id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    card_id: mongoose.Types.ObjectId;
    createdAt: Date;
}

export type ILogin = {
    email: string;
    password: string;
  };
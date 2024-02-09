import { Types } from "mongoose";
export interface Image {
    id: string;
    link: string;
}

export type Category = {
    _id: number;
    name: string;
    parentCategory?: {
        _id: number | string;
        name: string;
    };
    properties?: Property[]
}

export type Cat = {
    _id: number;
    name: string;
    description: string;
    dataBirth: string;
    images?: Image[];
    category?: Types.ObjectId;
    properties?: Property[]
}

export type News = {
    _id: number;
    title: string;
    info: string;
    images: Image[];
}

export type Property = {
    _id?: number;
    name: string;
    values: string[];
  }
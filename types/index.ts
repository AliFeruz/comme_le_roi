import { Document, Types } from "mongoose";
interface Image {
    id: Types.ObjectId;
    link: string;
}


export type Cat = {
    _id:number;
    name: string;
    description: string;
    dataBirth: string;
    images?: Image[];
    category?: Types.ObjectId;
    
}

export type News = {
    _id: number;
    title: string;
    info: string;
    images: Image[];
}
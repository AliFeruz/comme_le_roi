import mongoose, { Schema, model, models } from "mongoose";

const NewsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    images: [{
        id: { type: mongoose.Types.ObjectId },
        link: { type: String }
    }],
    },
    { timestamps: true });

export const News = models.News || model("News", NewsSchema);
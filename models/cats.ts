import mongoose, { Schema, model, models } from "mongoose";

const CatsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dataBirth: {
        type: String,
        required: true
    },
    images: {
        type: [String],
    },
    category: {
        type: mongoose.Types.ObjectId, ref: 'Category'
    },
    properties: {
        type: Object
    }
    },
    { timestamps: true });

export const Cats = models.Cats || model("Cats", CatsSchema);
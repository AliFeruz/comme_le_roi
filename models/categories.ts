import mongoose, { Schema, model, models } from "mongoose";

const PropertySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    values: {
        type: [String],
        required: true,
    },
});


const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    parentCategory: {
        type: mongoose.Types.ObjectId, ref: 'Category'
    },
    properties: [PropertySchema],
    });

export const Category = models.Category || model("Category", categorySchema);
import mongoose, { Schema, model, models } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    parentCategory: {
        type: mongoose.Types.ObjectId, ref: 'Category'
    }
    });

export const Category = models.Category || model("Category", categorySchema);
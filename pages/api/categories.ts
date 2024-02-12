import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/categories";
import type { NextApiRequest, NextApiResponse } from "next";
import { isAdminRequest } from "./auth/[...nextauth]";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const {method} = req;
    await mongooseConnect();
    await isAdminRequest({req, res});

    if(method === 'GET') {
        const data = await Category.find().populate('parentCategory');
        res.status(200).json(data)
    }

    if (method === 'PUT') {
        const {name, parentCategory, _id, properties} = req.body;
        const updatedCategory = await Category.updateOne({_id},{name, parentCategory, properties});
        res.status(200).json(updatedCategory);
    }

    if(method === 'POST') {
        const {name, parentCategory, properties} = req.body;
        const categoryDoc = await Category.create({
            name,
            parentCategory
        });
        res.status(200).json(categoryDoc);
    }

    if (method === 'DELETE') {
        const {_id } = req.query;
        await Category.deleteOne({ _id });
        res.status(200).json(true);
        
      }
}

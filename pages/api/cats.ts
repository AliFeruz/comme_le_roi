import { mongooseConnect } from "@/lib/mongoose";
import { Cats } from "@/models/cats";
import type { NextApiRequest, NextApiResponse } from "next";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const {method} = req;
    await mongooseConnect();

    if(method === 'GET') {
        if(req.query?.id){
            const cat = await Cats.findById({_id: req.query.id})
            res.status(200).json(cat)
        } else {
            const cats = await Cats.find({});
            res.status(200).json(cats)
        }
    }

    if (method === 'DELETE') {
        const {_id} = req.query;
        await Cats.deleteOne({_id});
        res.status(200).json(true);
      }

    if(method === 'POST') {
        const {name, description, dataBirth} = req.body;
        const catsDoc = await Cats.create({
            name,
            description,
            dataBirth
        });
        res.status(200).json(catsDoc);
    }

    if(method === 'PUT') {
        const {name, description, dataBirth, _id} = req.body;
        const updatedCatInfo = await Cats.findOneAndUpdate({_id}, {name, description, dataBirth})
        res.status(200).json(updatedCatInfo);
    }
  
}

import { mongooseConnect } from "@/lib/mongoose";
import { News } from "@/models/news";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const {method} = req;
    await mongooseConnect();
    

    if(method === 'GET') {
        if(req.query?.id){
            const oneNews = await News.findById({_id: req.query.id})
            res.status(200).json(oneNews)
        } else {
            const news = await News.find({});
            res.status(200).json(news)
        }
    }

    if (method === 'DELETE') {
        const {_id} = req.query;
        await News.deleteOne({_id});
        res.status(200).json(true);
      }


    if(method === 'POST') {
        const {title, info} = req.body;
        const catsDoc = await News.create({
            title,
            info
        });
        res.status(200).json(catsDoc);
    }

    if(method === 'PUT') {
        const {title, info, _id} = req.body;
        const updatedOneNews = await News.findOneAndUpdate({_id}, {title, info})
        res.status(200).json(updatedOneNews);
    }
  
}

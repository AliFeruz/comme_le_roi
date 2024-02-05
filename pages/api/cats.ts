import { mongooseConnect } from "@/lib/mongoose";
import { Cats } from "@/models/cats";
import type { NextApiRequest, NextApiResponse } from "next";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const {method} = req;
    await mongooseConnect();


    if(method === 'POST') {
        const {name, description, dataBirth} = req.body;
        const catsDoc = await Cats.create({
            name,
            description,
            dataBirth
        });
        res.status(200).json(catsDoc);
    }

  
}

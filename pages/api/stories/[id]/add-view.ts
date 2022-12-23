import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { addViewCount } from "../../../../lib/stories";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT")
    return res.status(400).json({ message: "This method is not allowed" });

  const { id } = req.query;

  await addViewCount(new ObjectId(id?.toString())).catch((err) =>
    res.status(400).json({ message: err })
  );

  res.status(200).end();
}

import { ObjectId } from "bson";
import { NextApiRequest, NextApiResponse } from "next";
import getUser from "../../../../lib/getUser";
import { like } from "../../../../lib/stories";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT")
    return res.status(400).json({ message: "This method is not allowed" });

  const { id } = req.query;

  const user = await getUser(req);
  if (!user)
    return res
      .status(400)
      .json({ message: "You must be signed in for this action" });

  const hasLiked = await like(new ObjectId(id?.toString()), user).catch((err) =>
    res.status(400).json({ message: err })
  );

  res.status(200).json({ hasLiked, message: "Liked successfully" });
}

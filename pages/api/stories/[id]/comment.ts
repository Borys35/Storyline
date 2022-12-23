import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import getUser from "../../../../lib/getUser";
import { addComment } from "../../../../lib/stories";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT")
    return res.status(400).json({ message: "This method is not allowed" });

  const { id } = req.query;
  const { text } = req.body;

  const user = await getUser(req);
  if (!user)
    return res
      .status(400)
      .json({ message: "You must be signed in for this action" });

  const comment = { text };
  const fullComment = await addComment(
    new ObjectId(id?.toString()),
    user,
    comment
  ).catch((err) => res.status(400).json({ message: err }));

  if (!fullComment) return;
  res
    .status(200)
    .json({ comment: fullComment, message: "Comment added successfully" });
}

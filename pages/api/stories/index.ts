import { NextApiRequest, NextApiResponse } from "next";
import { SortOptions } from "../../../interfaces";
import getUser from "../../../lib/getUser";
import { getStories, insertStory, validateStory } from "../../../lib/stories";
import tryCatch from "../../../lib/tryCatch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { page, limit, sort } = req.query;
    const pageIndex = parseInt(page as string) || 0;
    const pageSize = parseInt(limit as string) || 0;

    const stories = await getStories(
      pageIndex,
      pageSize,
      sort ? (sort.toString() as SortOptions) : undefined
    );

    res.status(200).json({ stories });
  } else if (req.method === "POST") {
    const user = await getUser(req);
    if (!user)
      return res
        .status(400)
        .json({ message: "You must be signed in for this action" });

    const { story } = req.body;

    const [validationError] = await tryCatch(validateStory(story));
    if (validationError)
      return res.status(400).json({ message: "Invalid story data" });

    const [insertError, storyId] = await tryCatch(insertStory(story, user));
    if (insertError)
      return res.status(500).json({ message: "Inserting story failed" });

    res.status(200).json({ storyId, message: "Successfully added!" });
  } else {
    res.status(400).json({ message: "This method is not allowed" });
  }
}

import { ObjectId } from "bson";
import { JWT } from "next-auth/jwt";
import {
  CommentForm,
  CommentFull,
  SortOptions,
  StoryForm,
  StoryFull,
} from "../interfaces";
import clientPromise from "./mongodb";
import { slidesSchema, storyInfoSchema } from "./schemas";

export async function getStories(
  page?: number,
  limit?: number,
  sort?: SortOptions,
  publicOnly = true
) {
  const db = (await clientPromise).db();
  const pageIndex = page || 0;
  const pageSize = limit || Number.MAX_SAFE_INTEGER;

  const sortOpts =
    sort === "latest"
      ? { createdAt: -1 }
      : sort === "oldest"
      ? { createdAt: 1 }
      : sort === "appreciations"
      ? { likesCount: -1 }
      : sort === "most-popular"
      ? { viewCount: -1 }
      : sort === "most-watched"
      ? { watchedCount: -1 }
      : sort === "highest-watched-view-ratio"
      ? { watchedViewRatio: -1 }
      : { createdAt: -1 };

  const match = publicOnly ? { isPrivate: false } : {};

  const stories = await db
    .collection("stories")
    .aggregate([
      {
        $set: {
          likesCount: { $size: "$likes" },
          watchedViewRatio: {
            $cond: {
              if: { $gte: ["$viewCount", 1] },
              then: { $divide: ["$watchedCount", "$viewCount"] },
              else: 0,
            },
          },
          id: { $toString: "$_id" },
        },
      },
      { $match: match },
      { $sort: sortOpts },
      { $skip: pageIndex * pageSize },
      { $limit: pageSize },
      { $project: { _id: 0, likes: 0, comments: 0 } },
    ])
    .toArray()
    .catch((e) => console.error(e));

  if (!stories) return null;
  return stories as StoryFull[];
}

export async function getStory(id: string) {
  const db = (await clientPromise).db();

  const stories = await db
    .collection("stories")
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $set: {
          id: { $toString: "$_id" },
          likes: {
            $map: {
              input: "$likes",
              in: {
                $mergeObjects: [
                  "$$this",
                  { userId: { $toString: "$$this.userId" } },
                ],
              },
            },
          },

          comments: {
            $map: {
              input: "$comments",
              in: {
                $mergeObjects: [
                  "$$this",
                  {
                    user: {
                      $mergeObjects: [
                        "$$this.user",
                        { userId: { $toString: "$$this.user.userId" } },
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
      { $project: { _id: 0 } },
    ])
    .toArray()
    .catch((e) => console.error(e));

  if (!stories) return null;

  return stories[0];
}

export async function insertStory(story: StoryForm, user: JWT) {
  const db = (await clientPromise).db();

  const { sub, name, picture } = user;
  const owner = {
    userId: sub || "",
    name: name || "",
    picture: picture || "",
  };

  const fullStory: StoryFull = {
    ...story,
    owner,
    likes: [],
    comments: [],
    viewCount: 0,
    watchedCount: 0,
    createdAt: Date.now(),
  };

  const result = await db
    .collection("stories")
    .insertOne(fullStory)
    .catch(console.error);

  if (!result) return null;

  return result.insertedId;
}

export async function validateStory(story: StoryForm) {
  const { name, description, isPrivate, slides } = story;

  try {
    await storyInfoSchema.validate({
      name,
      description,
      isPrivate,
    });

    await slidesSchema.validate({
      slides,
    });
  } catch (e) {
    throw e;
  }
}

export async function like(id: ObjectId, user: JWT) {
  const db = (await clientPromise).db();
  const { sub, name, picture } = user;
  const userId = new ObjectId(sub);

  const storiesCollection = db.collection("stories");

  const docExists =
    (await storiesCollection
      .find({ _id: id, likes: { $elemMatch: { userId } } })
      .count()) > 0;

  if (!docExists) {
    await storiesCollection.updateOne(
      { _id: id },
      { $push: { likes: { $each: [{ userId, name, picture }], $position: 0 } } }
    );
    return true;
  }

  await storiesCollection.updateOne(
    { _id: id },
    { $pull: { likes: { userId } } }
  );
  return false;
}

export async function addComment(
  id: ObjectId,
  user: JWT,
  comment: CommentForm
) {
  const db = (await clientPromise).db();
  const { sub, name, picture } = user;

  const commentObject: CommentFull = {
    ...comment,
    createdAt: Date.now(),
    user: { userId: new ObjectId(sub) as any, name, picture },
  };

  await db.collection("stories").updateOne(
    {
      _id: id,
    },
    {
      $push: { comments: { $each: [commentObject], $position: 0 } },
    }
  );

  commentObject.user.userId = sub;
  return commentObject;
}

export async function addViewCount(id: ObjectId) {
  const db = (await clientPromise).db();

  await db
    .collection("stories")
    .updateOne({ _id: id }, { $inc: { viewCount: 1 } });
}

export async function addWatchedCount(id: ObjectId) {
  const db = (await clientPromise).db();

  await db
    .collection("stories")
    .updateOne({ _id: id }, { $inc: { watchedCount: 1 } });
}

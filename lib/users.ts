import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";

export async function getUsers() {
  const db = (await clientPromise).db();

  const users = await db
    .collection("users")
    .aggregate([
      { $set: { id: { $toString: "$_id" } } },
      { $project: { _id: 0 } },
    ])
    .toArray()
    .catch(console.error);
  if (!users) return null;
  return users;
}

export async function getUser(id: string) {
  const db = (await clientPromise).db();

  // const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
  const users = await db
    .collection("users")
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      { $set: { id: { $toString: "$_id" } } },
      { $project: { _id: 0 } },
    ])
    .toArray()
    .catch(console.error);

  if (!users) return null;
  return users[0];
}

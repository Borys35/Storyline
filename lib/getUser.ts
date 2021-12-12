import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET || "";

export default async function getUser(req: NextApiRequest) {
  return await getToken({ req, secret } as any);
}

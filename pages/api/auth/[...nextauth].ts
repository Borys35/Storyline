import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../lib/mongodb";
import { loginSchema, registerSchema } from "../../../lib/schemas";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    adapter: MongoDBAdapter({
      db: (await clientPromise).db() as any,
    }),
    session: {
      jwt: true,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    callbacks: {
      jwt: async ({ user, token }: any) => {
        if (user && !token.sub) token.sub = user._id.toString();

        return token;
      },
      session: async ({ session, token, user }) => {
        if (session.user) session.user.id = token.sub || "";

        return session;
      },
    },
    theme: {
      colorScheme: "light",
    },
    providers: [
      CredentialsProvider({
        id: "register",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "" },
          email: { label: "E-mail", type: "text", placeholder: "" },
          password: { label: "Password", type: "password", placeholder: "" },
          password2: {
            label: "Repeat password",
            type: "password",
            placeholder: "",
          },
        } as any,
        authorize: async (credentials, req) => {
          const { username, email, password, password2 } = credentials as any;
          const db = (await clientPromise).db();

          const isValid = await registerSchema.isValid({
            username,
            email,
            password,
            password2,
          });
          if (!isValid) return null;

          const userExists =
            (await db.collection("users").find({ email }).count()) > 0;
          if (userExists) return null;

          const user: any = {
            name: username,
            email,
            image: `https://avatars.dicebear.com/api/pixel-art-neutral/${username}.svg`,
            emailVerified: null,
          };

          const { insertedId } = await db.collection("users").insertOne(user);

          const hash = await bcrypt.hash(password, 16);

          await db.collection("accounts").insertOne({
            provider: "local",
            type: "local",
            email,
            hash,
            userId: insertedId,
          });

          return user;
        },
      }),
      CredentialsProvider({
        id: "login",
        credentials: {
          email: { label: "E-mail", type: "text", placeholder: "" },
          password: { label: "Password", type: "password", placeholder: "" },
        } as any,
        authorize: async (credentials, req) => {
          const { email, password } = credentials as any;
          const db = (await clientPromise).db();

          const isValid = await loginSchema.isValid({
            email,
            password,
          });
          if (!isValid) return null;

          const account = await db.collection("accounts").findOne({ email });
          if (!account) return null;
          const { hash, userId } = account;

          const success = await bcrypt.compare(password, hash);
          if (!success) return null;

          const user: any = await db
            .collection("users")
            .findOne({ _id: userId });
          if (!user) return null;

          return user;
        },
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      }),
    ],
  });
}

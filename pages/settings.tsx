import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Button from "../components/button";
import Layout from "../components/layout";
import withAuth from "../lib/hoc/withAuth";

const MyProfile: NextPage = () => {
  const { data: session } = useSession();

  return (
    <Layout name="Profile">
      <div className="flex flex-col gap-6 items-start">
        <h1 className="font-bold text-5xl pb-4">Your settings</h1>
        {session?.user?.image && (
          <Image
            src={session?.user?.image}
            alt="Avatar"
            width={128}
            height={128}
            className="element"
          />
        )}
        <div>
          <p>
            Username: <strong>{session?.user?.name || "Not provided"}</strong>
          </p>
          <p>
            E-mail: <strong>{session?.user?.email || "Not provided"}</strong>
          </p>
        </div>
        <Button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</Button>
      </div>
    </Layout>
  );
};

export default withAuth(MyProfile, true);

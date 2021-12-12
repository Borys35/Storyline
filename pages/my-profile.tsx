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
      <h1>Profile</h1>
      {!session ? "Not logged in" : JSON.stringify(session)}
      <p>
        Username: <strong>{session?.user?.name || "EMPTY"}</strong>
      </p>
      <p>
        E-mail: <strong>{session?.user?.email || "EMPTY"}</strong>
      </p>
      {session?.user?.image && (
        <Image src={session?.user?.image} alt="Avatar" width={64} height={64} />
      )}
      <Button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</Button>
    </Layout>
  );
};

export default withAuth(MyProfile, true);

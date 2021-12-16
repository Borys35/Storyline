import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { FC } from "react";
import Footer from "./footer";
import Navbar from "./navbar";

interface LayoutProps {
  name: string;
}

const Layout: FC<LayoutProps> = ({ name, children }) => {
  const { status } = useSession();
  const loading = status === "loading";

  if (status === "loading") return <div>Loading</div>;

  return (
    <main className="flex flex-col min-h-screen bg-blue-200">
      <Head>
        <title>{name} | Storyline</title>
      </Head>
      {!loading ? (
        <>
          <Navbar />
          <div className="flex-1 pt-10 px-10">{children}</div>
          <Footer />
        </>
      ) : (
        <p className="justify-self-center self-center">Loading</p>
      )}
    </main>
  );
};

export default Layout;

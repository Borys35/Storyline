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

  if (status === "loading") return <div>Loading</div>;

  return (
    <main className="flex flex-col min-h-screen bg-blue-200">
      <Head>
        <title>{name} | Storyline</title>
      </Head>
      <>
        <Navbar />
        <div className="flex-1 pt-10 px-10">{children}</div>
        <Footer />
      </>
    </main>
  );
};

export default Layout;

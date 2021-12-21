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

  return (
    <main className="flex flex-col min-h-screen bg-sky-100">
      <Head>
        <title>{name} | Storyline</title>
      </Head>
      {!loading ? (
        <>
          <Navbar />
          <div className="flex-1 pt-28 px-10 relative z-10">{children}</div>
          <Footer />
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p>Loading</p>
        </div>
      )}
    </main>
  );
};

export default Layout;

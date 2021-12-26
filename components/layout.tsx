import classNames from "classnames";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { FC, useEffect, useState } from "react";
import Footer from "./footer";
import Navbar from "./navbar";

interface LayoutProps {
  name: string;
  hasPadding?: boolean;
  hasMaxWidth?: boolean;
  mainOnly?: boolean;
}

const Layout: FC<LayoutProps> = ({
  name,
  hasPadding = true,
  hasMaxWidth = true,
  mainOnly = false,
  children,
}) => {
  const [dotCount, setDotCount] = useState(0);
  const { status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setDotCount(dotCount === 3 ? 0 : dotCount + 1);
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, [loading, dotCount]);

  return (
    <main className="bg-sky-100 overflow-x-hidden min-h-screen flex flex-col">
      <Head>
        <title>{name} - Storyline</title>
      </Head>
      {!loading ? (
        <>
          {!mainOnly && <Navbar />}

          <div
            className={classNames("flex flex-col flex-1 w-full", {
              "max-w mx-auto": hasMaxWidth,
            })}
          >
            <div
              className={classNames("flex-1 relative z-10", {
                "pt-28 px-hor": hasPadding,
                "mb-10": !mainOnly,
              })}
            >
              {children}
            </div>
          </div>
          {!mainOnly && <Footer />}
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p>
            Loading
            {Array(dotCount)
              .fill(null)
              .map((_) => ".")}
          </p>
        </div>
      )}
    </main>
  );
};

export default Layout;

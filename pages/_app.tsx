import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import React from "react";
import "../styles/globals.css";

NProgress.configure({
  minimum: 0.3,
  easing: "linear",
  speed: 400,
  showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

interface PageProps {
  session?: Session | null;
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<PageProps>) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;

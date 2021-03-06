import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/layout";

const ErrorPage: NextPage = () => {
  return (
    <Layout name="Home">
      <div className="flex flex-col self-center gap-6">
        <p className="text-9xl font-bold">Error</p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </div>
    </Layout>
  );
};

export default ErrorPage;

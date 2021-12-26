import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/layout";

const NotFoundPage: NextPage = () => {
  return (
    <Layout name="Home">
      <div className="flex flex-col items-start gap-6">
        <h1 className="text-9xl font-bold">404</h1>
        <Link href="/">
          <a className="link font-bold text-xl inline">Go home</a>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

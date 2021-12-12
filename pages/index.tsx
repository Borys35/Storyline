import type { NextPage } from "next";
import Link from "next/link";
import Button from "../components/button";
import Layout from "../components/layout";

const Home: NextPage = () => {
  return (
    <Layout name="Home">
      <div className="flex flex-col self-center gap-6">
        <span className="text-gray-700">Front</span>
        <h1 className="text-6xl font-bold text-green-600">Heading</h1>
        <p className="text-xl">Subheading</p>
        <div className="flex gap-8 items-center">
          <Link href="/sign-in">
            <a className="focus:ring-2">Sign in</a>
          </Link>
          <Link href="/sign-up">Sign up</Link>
          <Link href="/my-profile">My Profile</Link>
          <Button to="/create-story">Create story</Button>
          <Button to="/discover" primary>
            Discover
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

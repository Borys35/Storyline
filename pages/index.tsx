import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { animated, useSpring } from "react-spring";
import Button from "../components/button";
import Layout from "../components/layout";

const Home: NextPage = () => {
  const [flip, setFlip] = useState(false);
  const { y } = useSpring({
    from: { y: 0 },
    to: { y: 50 },
    delay: 500,
    config: { mass: 200 },
    reverse: flip,
    onRest: () => setFlip(!flip),
  });

  return (
    <Layout name="Home">
      <div className="flex flex-col self-center gap-6">
        <span className="element p-4 bg-blue-300">Front</span>
        <header className="relative">
          <animated.div
            className="w-12 h-12 bg-red-600 absolute top-3 left-3 z-minus-10"
            style={{ transform: y.to((y) => `translateY(${y}px)`) }}
          ></animated.div>
        </header>
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

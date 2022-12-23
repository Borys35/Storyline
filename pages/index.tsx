import type { GetStaticProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import Button from "../components/button";
import StoryItem from "../components/discover/story-item";
import Block from "../components/home/block";
import Layout from "../components/layout";
import { StoryFull } from "../interfaces";
import { getStories } from "../lib/stories";

interface Props {
  stories: StoryFull[];
}

export const getStaticProps: GetStaticProps = async () => {
  const stories = await getStories(0, 5);

  return {
    props: { stories },
    revalidate: 60,
  };
};

const Home: NextPage<Props> = ({ stories }) => {
  const { data: session } = useSession();

  return (
    <Layout name="Home" hasPadding={false} hasMaxWidth={false}>
      <div className="flex flex-col gap-36">
        <header
          className="relative element flex flex-col items-center bg-red-400 
              rounded-t-none rounded-b-3xl pt-48 pb-32 px-hor z-30 overflow-hidden"
        >
          <h1 className="text-6xl font-bold text-center mb-6">
            Write your own story
          </h1>
          <p className="mb-12 text-lg text-center">
            Storyline is a content-sharing platform for everyone. Create and
            explore stories!
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Button primary href="#discover">
              Dive into
            </Button>
            {!session ? (
              <Button to="/sign-up">Sign up</Button>
            ) : (
              <Button to="/create-story">Create story</Button>
            )}
          </div>
        </header>
        <section className="ml-calced pt-8" id="discover">
          <div className="mr-calced">
            <h2 className="font-bold text-5xl mb-4">Discover whole database</h2>
            <p className="mb-8">
              With pagination and sorting functionality you can go through all
              stories faster and more conveniently.
            </p>
          </div>
          <div className="relative flex md:block gap-4 whitespace-nowrap">
            {stories.map(({ id, name, createdAt, description, owner }, i) => (
              <div className="inline-block w-80 md:mr-4" key={i}>
                <StoryItem
                  key={i}
                  id={id || ""}
                  name={name}
                  description={description}
                  owner={owner}
                  createdAt={createdAt}
                />
              </div>
            ))}
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-gradient-to-l from-sky-100 via-sky-100 to-transparent z-30">
              <Button
                primary
                to="/discover"
                className="absolute top-1/2 -translate-y-1/2 right-calced"
              >
                Discover
              </Button>
            </div>
          </div>
        </section>
        <section className="p-hor max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-12">
            <h2 className="font-bold text-5xl sm:col-start-1 sm:col-end-3 text-center">
              Features of the app
            </h2>
            <Block
              side="left"
              heading="Server-side rendering"
              text="Every page on this site is either statically generated in build time or built on the server when requested. There is no CSR. Everything thanks to Next.js."
            />
            <Block
              side="right"
              heading="Authentication"
              text="You can choose if you want to use help of well known providers (Google/GitHub) or sign up in a traditional way - with e-mail and password."
            />
            <Block
              side="left"
              heading="Pagination/Sorting"
              text="Besides listing all visible stories, you can sort them. Stories are always sorted in some way and displayed with a pagination feature."
            />
            <Block
              side="right"
              heading="All features that content-sharing website needs"
              text="Posting, listing, sorting, commenting, likes, views. These are some of the content-sharing platform's features that are also covered here."
            />
          </div>
        </section>
        <section className="flex flex-col-reverse xl:flex-row rounded-3xl element bg-red-400 p-hor mx-hor xl:mr-0 xl:rounded-r-none xl:rounded-l-3xl gap-24 xl:ml-calced xl:pr-calced">
          <div>
            <h2 className="font-bold text-5xl mb-6">
              Build your stories with an easy creator
            </h2>
            <p className="text-lg mb-12">
              Storyline&apos;s story creator lets you build your stories in a
              fun, easy way. Everything is always validated so you don&apos;t
              mess up with a content of the story!
            </p>
            <Button primary to="/create-story">
              Create story
            </Button>
          </div>
          <div className="grid items-center justify-items-center xl:justify-items-end">
            <svg
              width="496"
              height="426"
              viewBox="0 0 496 426"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-fit max-w-md"
            >
              <rect
                x="1"
                y="1"
                width="494"
                height="424"
                rx="7"
                fill="#FCA5A5"
                stroke="black"
                strokeWidth="2"
              />
              <rect
                x="32.821"
                y="35.7725"
                width="65.1463"
                height="65.1463"
                rx="7"
                fill="#2DD4BF"
                stroke="black"
                strokeWidth="2"
              />
              <rect
                x="32.8206"
                y="131.696"
                width="65.1463"
                height="65.1463"
                rx="7"
                fill="#2DD4BF"
                stroke="black"
                strokeWidth="2"
              />
              <rect
                x="140.734"
                y="68.1465"
                width="319.343"
                height="65.1463"
                rx="7"
                fill="#2DD4BF"
                stroke="black"
                strokeWidth="2"
              />
              <rect
                x="140.735"
                y="159.273"
                width="319.343"
                height="197.041"
                rx="7"
                fill="#2DD4BF"
                stroke="black"
                strokeWidth="2"
              />
              <rect
                x="32.8206"
                y="227.619"
                width="65.1463"
                height="65.1463"
                rx="7"
                fill="#2DD4BF"
                stroke="black"
                strokeWidth="2"
              />
              <rect
                x="32.821"
                y="323.542"
                width="65.1463"
                height="65.1463"
                rx="7"
                fill="#2DD4BF"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          </div>
        </section>
        <div></div>
      </div>
    </Layout>
  );
};

export default Home;

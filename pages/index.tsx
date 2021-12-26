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
          className="relative element flex flex-col gap-12 items-center bg-red-400 
              rounded-t-none rounded-b-full pt-48 pb-32 px-hor z-30 overflow-hidden"
        >
          <svg
            width="1196"
            height="562"
            viewBox="0 0 1196 562"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -z-10 top-0 bottom-0"
          >
            <rect
              x="309"
              y="214"
              width="373"
              height="225"
              rx="7"
              fill="#FCA5A5"
              stroke="black"
              strokeWidth="2"
            />
            <rect
              x="122"
              y="393"
              width="78"
              height="78"
              rx="7"
              fill="#FCA5A5"
              stroke="black"
              strokeWidth="2"
            />
            <rect
              x="375"
              y="483"
              width="78"
              height="78"
              rx="7"
              fill="#FCA5A5"
              stroke="black"
              strokeWidth="2"
            />
            <rect
              x="813"
              y="361"
              width="78"
              height="78"
              rx="7"
              fill="#FCA5A5"
              stroke="black"
              strokeWidth="2"
            />
            <rect
              x="1117"
              y="199"
              width="78"
              height="78"
              rx="7"
              fill="#FCA5A5"
              stroke="black"
              strokeWidth="2"
            />
            <rect
              x="968"
              y="1"
              width="72"
              height="520"
              rx="7"
              fill="#FCA5A5"
              stroke="black"
              strokeWidth="2"
            />
            <rect
              x="1"
              y="21"
              width="412"
              height="112"
              rx="7"
              fill="#FCA5A5"
              stroke="black"
              strokeWidth="2"
            />
          </svg>

          <h1 className="text-6xl font-bold text-center">
            Write your own story
          </h1>
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
            <h2 className="font-bold text-5xl mb-4">Discover whole library</h2>
            <p className="mb-8">
              Erat vitae tortor est proin id sagittis ipsum vitae. Nec in sed
              massa proin morbi.
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
          <div className="grid sm:grid-cols-2 gap-8">
            <h2 className="font-bold text-5xl sm:col-start-1 sm:col-end-3 text-center">
              Why to use it?
            </h2>
            <Block
              side="left"
              heading="Explore tons of ideas"
              text="Erat vitae tortor est proin id sagittis ipsum vitae. Nec in sed massa proin morbi."
            />
            <Block
              side="right"
              heading="Explore tons of ideas"
              text="Erat vitae tortor est proin id sagittis ipsum vitae. Nec in sed massa proin morbi."
            />
            <Block
              side="left"
              heading="Explore tons of ideas"
              text="Erat vitae tortor est proin id sagittis ipsum vitae. Nec in sed massa proin morbi."
            />
            <Block
              side="right"
              heading="Explore tons of ideas"
              text="Erat vitae tortor est proin id sagittis ipsum vitae. Nec in sed massa proin morbi."
            />
          </div>
        </section>
        <section className="flex flex-col-reverse xl:flex-row rounded-3xl element bg-red-400 p-hor mx-hor xl:mr-0 xl:rounded-r-none xl:rounded-l-3xl gap-24 xl:ml-calced xl:pr-calced">
          <div>
            <h2 className="font-bold text-5xl mb-6">
              Write own stories with easy creator
            </h2>
            <p className="text-xl mb-10">
              Felis ultrices scelerisque sapien, integer urna, tortor eu. Proin
              nulla viverra in neque, ornare ut.
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

import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../../../components/button";
import Layout from "../../../components/layout";
import { StoryForm } from "../../../interfaces";
import { getStory } from "../../../lib/stories";

interface Props {
  id: string;
  story: StoryForm;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id?.toString();

  if (!id)
    return {
      notFound: true,
    };

  const story = await getStory(id);
  if (!story)
    return {
      notFound: true,
    };

  return {
    props: { id, story },
  };
};

// export const getStaticProps: GetStaticProps = async (
//   context: GetStaticPropsContext
// ) => {
//   const { params } = context;
//   const id = params?.id as string;

//   const story = await getStory(id);

//   return {
//     props: { id, story },
//   };
// };

// export const getStaticPaths: GetStaticPaths = async (
//   context: GetStaticPathsContext
// ) => {
//   const stories = (await getStories()) || [];

//   const paths = stories.map((story) => ({ params: { id: story.id } }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

const WatchPage: NextPage<Props> = ({ id, story }) => {
  const [index, setIndex] = useState(0);
  const [watched, setWatched] = useState(false);
  const { slides } = story;
  const { title, text, drawingUrl } = slides[index];

  function handlePrev() {
    if (index > 0) setIndex(index - 1);
  }

  function handleNext() {
    if (index < slides.length - 1) setIndex(index + 1);
    if (index >= slides.length - 1) setWatched(true); // show end screen
  }

  useEffect(() => {
    // ADD VIEW
    axios.put(`/api/stories/${id}/add-view`);
  }, [id]);

  useEffect(() => {
    if (!watched) return;

    // ADD WATCHED VIEW
    axios.put(`/api/stories/${id}/add-watched`);
  }, [watched, id]);

  const ArrowLeft = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      onClick={() => handlePrev()}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  );

  const ArrowRight = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      onClick={() => handleNext()}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );

  return (
    <Layout
      name={!watched ? "Watching..." : "Watched"}
      mainOnly={true}
      hasPadding={false}
    >
      <div className="m-10">
        {!watched && (
          <Button to={`/stories/${id}`} className="mb-3">
            Close
          </Button>
        )}
        <div className="element p-10">
          {!watched ? (
            <div>
              <div className="flex gap-4 items-center">
                <ArrowLeft />
                <div className="flex-1 flex flex-col gap-4 text-center items-center">
                  {drawingUrl && (
                    <Image
                      src={drawingUrl}
                      width={300}
                      height={200}
                      alt="Drawing"
                    />
                  )}
                  <h1 className="font-bold text-4xl">{title}</h1>
                  <p className="text-lg">{text}</p>
                </div>
                <ArrowRight />
              </div>
            </div>
          ) : (
            <div>
              <h1 className="font-bold text-4xl mb-2">Story has ended</h1>
              <p className="mb-6">
                Return to the main page and rate the story!
              </p>
              <Button to={`/stories/${id}`} primary>
                Return
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WatchPage;

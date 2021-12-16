import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
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
  const { title, text } = slides[index];

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

  return (
    <Layout name={!watched ? "Watching..." : "Watched"}>
      {!watched ? (
        <div>
          <h1>{title}</h1>
          <p>{text}</p>

          <Button to={`/stories/${id}`}>Close</Button>
          <Button onClick={() => handlePrev()}>Prev</Button>
          <Button onClick={() => handleNext()}>Next</Button>
        </div>
      ) : (
        <div>
          ENDED
          <Button to={`/stories/${id}`}>Return</Button>
        </div>
      )}
    </Layout>
  );
};

export default WatchPage;

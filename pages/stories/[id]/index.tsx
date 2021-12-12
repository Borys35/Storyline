import axios from "axios";
import produce from "immer";
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import Button from "../../../components/button";
import Layout from "../../../components/layout";
import Modal from "../../../components/modal";
import CommentSection from "../../../components/stories/comment-section";
import LikeItem from "../../../components/stories/like-item";
import { StoryFull } from "../../../interfaces";
import { getStories, getStory } from "../../../lib/stories";

interface Props {
  id: string;
  story: StoryFull;
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { params } = context;
  const id = params?.id?.toString();

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
    props: { story },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async (
  context: GetStaticPathsContext
) => {
  const stories = (await getStories()) || [];

  const paths = stories.map((story) => ({ params: { id: story.id } }));

  return {
    paths,
    fallback: false,
  };
};

const ThumbUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
    />
  </svg>
);

const StoryPage: NextPage<Props> = ({ story }) => {
  // const [likeAdd, setLikeAdd] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const { data: session } = useSession();
  const {
    id,
    name,
    description,
    likes,
    comments,
    viewCount,
    watchedCount,
    createdAt,
    owner,
  } = story;
  const [likeArray, setLikeArray] = useState(likes);
  const [commentArray, setCommentArray] = useState(comments);
  // const likesCount = likes.length + likeAdd;

  function findSessionUserIndex() {
    const foundIndex = likeArray.findIndex(
      (like) => like.userId === session?.user?.id
    );
    return foundIndex;
  }

  async function handleLike() {
    const res = await axios.put(`/api/stories/${id}/like`).catch(() => {});
    if (!res || !session?.user) return;

    const foundIndex = findSessionUserIndex();

    if (foundIndex === -1) {
      const { id, name, image } = session?.user;
      setLikeArray(
        produce(likeArray, (draft) => {
          draft.unshift({ userId: id, name, picture: image });
        })
      );
    } else {
      setLikeArray(
        produce(likeArray, (draft) => {
          draft.splice(foundIndex, 1);
        })
      );
    }
  }

  // useEffect(() => {
  //   if (!session) return;

  //   const foundUser = !!likes.find((like) => like.userId === session?.user?.id);
  //   setLiked(foundUser);
  // }, []);

  return (
    <Layout name={name}>
      <Button to="/discover">Back</Button>
      <p>{new Date(createdAt).toDateString()}</p>
      <Link href={`/profile/${owner.userId}`}>
        <a className="underline">Owner: {owner.name}</a>
      </Link>
      <h1>{name}</h1>
      <p>{description}</p>
      <Button to={`/stories/${id}/watch`} primary>
        Watch the story
      </Button>
      <Modal isOpen={modalOpen} setOpen={setModalOpen}>
        <h1>Likes</h1>
        {likeArray.map(({ name, picture }, i) => (
          <LikeItem key={i} name={name} picture={picture} />
        ))}
      </Modal>
      <strong onClick={() => setModalOpen(true)}>{likeArray.length}</strong> ---{" "}
      {viewCount} / {watchedCount}
      <ThumbUp />
      <Button onClick={() => handleLike()}>Like</Button>
      {id && (
        <CommentSection
          storyId={id}
          comments={commentArray}
          setComments={setCommentArray}
        />
      )}
    </Layout>
  );
};

export default StoryPage;

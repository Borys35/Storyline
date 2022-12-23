import axios from "axios";
import classNames from "classnames";
import produce from "immer";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import Button from "../../../components/button";
import StoryItem from "../../../components/discover/story-item";
import Layout from "../../../components/layout";
import Modal from "../../../components/modal";
import CommentSection from "../../../components/stories/comment-section";
import LikeItem from "../../../components/stories/like-item";
import WithSubheading from "../../../components/stories/with-subheading";
import { StoryFull } from "../../../interfaces";
import { getStories, getStory } from "../../../lib/stories";
import timestampToString from "../../../lib/timestampToString";

interface Props {
  id: string;
  story: StoryFull;
  stories: StoryFull[] | null;
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

  const stories = await getStories(0, 6, "latest");

  return {
    props: { story, stories },
  };
};

const ThumbUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
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

const ThumbUpSolid = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
  </svg>
);

const StoryPage: NextPage<Props> = ({ story, stories }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: session } = useSession();
  const {
    id,
    name,
    description,
    isPrivate,
    slides,
    likes,
    comments,
    viewCount,
    watchedCount,
    createdAt,
    owner,
  } = story;
  const [likeArray, setLikeArray] = useState(likes);
  const [commentArray, setCommentArray] = useState(comments);

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

  return (
    <Layout name={name}>
      <div className="flex flex-col gap-12">
        <Button to="/discover" className="self-start">
          Back
        </Button>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="col-start-1 col-end-3 self-start element p-6 bg-cyan-400">
            <WithSubheading subheading="Title" className="mb-10">
              <h1 className="font-bold text-6xl break-words">{name}</h1>
            </WithSubheading>
            <Button to={`/stories/${id}/watch`} primary>
              Watch the story
            </Button>
          </div>
          <div className="flex flex-col items-start gap-4">
            <WithSubheading subheading="Description">
              <p>{description || "No description :("}</p>
            </WithSubheading>
            <WithSubheading subheading="Created at">
              <p className="text-2xl font-bold">
                {timestampToString(createdAt)}
              </p>
            </WithSubheading>
            <WithSubheading subheading="Author">
              <Link href={`/profile/${owner.userId}`}>
                <a className="text-2xl font-bold block link">{owner.name}</a>
              </Link>
            </WithSubheading>
            <WithSubheading subheading="How many slides?">
              <p className="text-2xl font-bold">{slides.length}</p>
            </WithSubheading>
            <WithSubheading subheading="Is Private?">
              <p className="text-2xl font-bold">{isPrivate ? "Yes" : "No"}</p>
            </WithSubheading>
          </div>
        </div>

        <div className="flex justify-between element px-4 py-2">
          <div className="flex gap-4 col-start-1 col-end-3">
            <WithSubheading subheading="Views">
              <p className="text-2xl font-bold">{viewCount}</p>
            </WithSubheading>
            <WithSubheading subheading="Views (watched)">
              <p className="text-2xl font-bold">{watchedCount}</p>
            </WithSubheading>
          </div>
          <div className="flex gap-4 items-center">
            <span onClick={() => handleLike()} className="cursor-pointer">
              {findSessionUserIndex() === -1 ? <ThumbUp /> : <ThumbUpSolid />}
            </span>
            <WithSubheading subheading="Likes">
              <p
                className="text-2xl font-bold cursor-pointer"
                onClick={() => setModalOpen(true)}
              >
                {likeArray.length}
              </p>
            </WithSubheading>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {id && (
            <WithSubheading
              className="lg:col-start-1 lg:col-end-3"
              subheading={`${commentArray.length} Comment${
                commentArray.length !== 1 ? "s" : ""
              }`}
            >
              <CommentSection
                storyId={id}
                comments={commentArray}
                setComments={setCommentArray}
              />
            </WithSubheading>
          )}
          {stories && (
            <div className="flex flex-col gap-4">
              {stories.map(({ id, name, description, owner, createdAt }, i) => (
                <StoryItem
                  key={i}
                  id={id || ""}
                  name={name}
                  description={description}
                  owner={owner}
                  createdAt={createdAt}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={modalOpen} setOpen={setModalOpen}>
        <div className="flex flex-col gap-2">
          <h1
            className={classNames("font-bold text-xl", {
              "pb-3": likeArray.length,
            })}
          >
            {likeArray.length ? "Likes" : "No likes for now"}
          </h1>
          {likeArray.map(({ name, picture }, i) => (
            <LikeItem key={i} name={name} picture={picture} />
          ))}
        </div>
      </Modal>
    </Layout>
  );
};

export default StoryPage;

import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import produce from "immer";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { CommentForm, CommentFull } from "../../interfaces";
import { commentSchema } from "../../lib/schemas";
import InlineForm from "../inline-form";
import CommentItem from "./comment-item";

interface Props {
  storyId: string;
  comments: CommentFull[];
  setComments: (arg0: CommentFull[]) => void;
}

const CommentSection: FC<Props> = ({ storyId, comments, setComments }) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<CommentForm>({ resolver: yupResolver(commentSchema) });

  async function handleAddComment({ text }: CommentForm) {
    const res = await axios
      .put(`/api/stories/${storyId}/comment`, { text })
      .catch((e) => {
        const { message } = e.response.data;
        setError("text", { message });
      });

    if (!res) return;

    const { comment } = res.data;
    setValue("text", "");
    setComments(
      produce(comments, (draft) => {
        draft.unshift(comment);
      })
    );
  }

  return (
    <section className="flex flex-col gap-4">
      <InlineForm
        fieldProps={{
          inputProps: register("text"),
        }}
        buttonProps={{ text: "Comment", primary: true }}
        onSubmit={handleSubmit(handleAddComment)}
      />
      {comments.map((comment, i) => (
        <CommentItem key={i} {...comment} />
      ))}
    </section>
  );
};

export default CommentSection;

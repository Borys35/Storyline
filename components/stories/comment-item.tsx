import Image from "next/image";
import { FC } from "react";
import { CommentFull } from "../../interfaces";

interface Props extends CommentFull {}

const CommentItem: FC<Props> = ({ text, createdAt, user }) => {
  return (
    <div className="p-4">
      <div>{new Date(createdAt).toDateString()}</div>
      <div>
        {user.picture && (
          <Image
            src={user.picture}
            alt="Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        {user.name}
      </div>
      <div>{text}</div>
    </div>
  );
};

export default CommentItem;

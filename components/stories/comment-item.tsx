import Image from "next/image";
import { FC } from "react";
import { CommentFull } from "../../interfaces";
import timestampToString from "../../lib/timestampToString";

interface Props extends CommentFull {}

const CommentItem: FC<Props> = ({ text, createdAt, user }) => {
  return (
    <div className="flex gap-3">
      <div>
        {user.picture && (
          <Image
            src={user.picture}
            alt="Avatar"
            width={32}
            height={32}
            className="element"
          />
        )}
      </div>
      <div>
        <div className="flex gap-4 mb-2 items-center">
          <p>{user.name}</p>
          <p className="text-sm">{timestampToString(createdAt)}</p>
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default CommentItem;

import Link from "next/link";
import React, { FC, HTMLAttributes } from "react";
import { User } from "../../interfaces";
import timestampToString from "../../lib/timestampToString";

interface Props extends HTMLAttributes<HTMLDivElement> {
  id: string;
  name: string;
  description: string;
  owner: User;
  createdAt: number;
}

const StoryItem: FC<Props> = ({
  id,
  name,
  description,
  owner,
  createdAt,
  ...props
}) => {
  return (
    <Link href={`/stories/${id}`}>
      <a>
        <div className="element p-4 bg-blue-200 cursor-pointer" {...props}>
          <div className="flex gap-4 items-center pb-4">
            <Link href={`/profile/${owner.userId}`}>
              <a className="link">{owner.name}</a>
            </Link>
            <div className="rounded-full w-1 h-1 bg-black"></div>
            <span>{timestampToString(createdAt)}</span>
          </div>
          <h4 className="font-bold text-xl line-clamp-3">{name}</h4>
          <p className="mt-1 line-clamp-3">{description}</p>
        </div>
      </a>
    </Link>
  );
};

export default StoryItem;

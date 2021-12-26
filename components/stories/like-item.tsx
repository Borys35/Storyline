import Image from "next/image";
import { FC } from "react";

interface Props {
  name?: string | null;
  picture?: string | null;
}

const LikeItem: FC<Props> = ({ name, picture }) => {
  return (
    <div className="flex items-start gap-2">
      {picture && (
        <Image
          src={picture}
          alt="Avatar"
          width={32}
          height={32}
          className="element"
        />
      )}
      <span>{name}</span>
    </div>
  );
};

export default LikeItem;

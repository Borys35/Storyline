import Image from "next/image";
import { FC } from "react";

interface Props {
  name?: string | null;
  picture?: string | null;
}

const LikeItem: FC<Props> = ({ name, picture }) => {
  return (
    <div>
      {picture && <Image src={picture} alt="Avatar" width={32} height={32} />}
      {name}
    </div>
  );
};

export default LikeItem;

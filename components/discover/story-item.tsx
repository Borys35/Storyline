import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  name: string;
}

const StoryItem: FC<Props> = ({ name, ...props }) => {
  return (
    <div className="h-96 p-4 bg-red-300" {...props}>
      {name}
    </div>
  );
};

export default StoryItem;

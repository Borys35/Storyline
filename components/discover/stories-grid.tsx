import { useRouter } from "next/router";
import { FC } from "react";
import { StoryFull } from "../../interfaces";
import StoryItem from "./story-item";

interface Props {
  stories: StoryFull[];
}

const StoriesGrid: FC<Props> = ({ stories }) => {
  const router = useRouter();

  function handleStoryClick(id: string) {
    router.push(`/stories/${id}`);
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {stories.map(({ name, id }, i) => (
        <StoryItem key={i} name={name} onClick={() => handleStoryClick(id)} />
      ))}
    </div>
  );
};

export default StoriesGrid;

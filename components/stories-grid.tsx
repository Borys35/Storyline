import { FC } from "react";
import { StoryFull } from "../interfaces";
import SkeletonItem from "./discover/skeleton-item";
import StoryItem from "./discover/story-item";

interface Props {
  stories: StoryFull[];
}

const StoriesGrid: FC<Props> = ({ stories }) => {
  return (
    <div className="stories-grid">
      {stories.length
        ? stories.map(({ name, description, owner, createdAt, id }, i) => (
            <StoryItem
              key={i}
              id={id || ""}
              name={name}
              description={description}
              owner={owner}
              createdAt={createdAt}
            />
          ))
        : Array(24)
            .fill(null)
            .map((_, i) => <SkeletonItem key={i} />)}
    </div>
  );
};

export default StoriesGrid;

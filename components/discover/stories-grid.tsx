import axios from "axios";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import useOnScreen from "../../hooks/useOnScreen";
import { StoryFull } from "../../interfaces";
import StoryItem from "./story-item";

interface Props {
  pageSize: number;
  pageSort: string;
}

const getKey = (
  pageIndex: number,
  previousPageData: any,
  size: number,
  sort?: string
) => {
  if (previousPageData && !previousPageData.stories.length) return null;

  if (sort) return `/api/stories?page=${pageIndex}&limit=${size}&sort=${sort}`;

  return `/api/stories?page=${pageIndex}&limit=${size}`;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const StoriesGrid: FC<Props> = ({ pageSize, pageSort }) => {
  const router = useRouter();
  const { data, error, size, setSize } = useSWRInfinite(
    (...args) => getKey(...args, pageSize, pageSort),
    fetcher
  );
  const [isIntersecting, dummyRef] = useOnScreen({ rootMargin: "100px" });
  const stories: StoryFull[] = [];
  data && data.forEach((d) => stories.push(...d.stories));

  function handleStoryClick(id?: string) {
    if (!id) return;

    router.push(`/stories/${id}`);
  }

  useEffect(() => {
    setSize(size + 1);
  }, [isIntersecting]); // eslint-disable-line

  return (
    <>
      <div className="stories-grid">
        {data
          ? stories.map(({ name, id }, i) => (
              <StoryItem
                key={i}
                name={name}
                onClick={() => handleStoryClick(id)}
              />
            ))
          : Array(12)
              .fill(null)
              .map((_, i) => <div key={i} className="bg-skeleton"></div>)}
      </div>
      <div ref={dummyRef}></div>
    </>
  );
};

export default StoriesGrid;

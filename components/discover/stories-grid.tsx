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

  console.log("data", data);

  return (
    <div className="grid grid-cols-4 gap-4">
      {data ? (
        stories.map(({ name, id }, i) => (
          <StoryItem key={i} name={name} onClick={() => handleStoryClick(id)} />
        ))
      ) : (
        <>
          <div className="bg-gray-500 h-96"></div>
          <div className="bg-gray-500  h-96"></div>
          <div className="bg-gray-500  h-96"></div>
          <div className="bg-gray-500  h-96"></div>
          <div className="bg-gray-500  h-96"></div>
          <div className="bg-gray-500  h-96"></div>
          <div className="bg-gray-500  h-96"></div>
          <div className="bg-gray-500  h-96"></div>
        </>
      )}
      <div ref={dummyRef}></div>
    </div>
  );
};

export default StoriesGrid;

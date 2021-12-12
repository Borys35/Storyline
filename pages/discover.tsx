import axios from "axios";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect } from "react";
import { SWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";
import StoriesGrid from "../components/discover/stories-grid";
import Layout from "../components/layout";
import useOnScreen from "../hooks/useOnScreen";
import { StoryFull } from "../interfaces";
import { getStories } from "../lib/stories";

const PAGE_SIZE = 4;

interface Props {
  fallback: any;
}

export const getStaticProps: GetStaticProps = async () => {
  const stories = await getStories(0, PAGE_SIZE);

  return {
    props: { fallback: { "/api/stories": { stories } } },
    revalidate: 60,
  };
};

const getKey = (pageIndex: number, previousPageData: any, sort?: string) => {
  if (previousPageData && !previousPageData.stories.length) return null;

  if (sort)
    return `/api/stories?page=${pageIndex}&limit=${PAGE_SIZE}&sort=${sort}`;

  return `/api/stories?page=${pageIndex}&limit=${PAGE_SIZE}`;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Discover: NextPage<Props> = ({ fallback }) => {
  const router = useRouter();
  const { sort } = router.query;
  const { data, error, size, setSize } = useSWRInfinite(
    (...args) => getKey(...args, sort?.toString()),
    fetcher
  );
  // const dummyRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, dummyRef] = useOnScreen({ rootMargin: "100px" });
  const stories: StoryFull[] = [];
  data && data.forEach((d) => stories.push(...d.stories));

  function handleChangeSort(e: ChangeEvent<HTMLSelectElement>) {
    router.push({ query: { sort: e.target.value } });
  }

  useEffect(() => {
    setSize(size + 1);
  }, [isIntersecting]); // eslint-disable-line

  // if (!data) return <div>Error or loading</div>;

  return (
    <SWRConfig value={{ fallback }}>
      <Layout name="Discover">
        <select
          className="outline-none focus:ring-4 rounded-lg px-4 py-2"
          defaultValue={sort}
          onChange={handleChangeSort}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="appreciations">Most Appreciated</option>
        </select>
        {data ? (
          <>
            <StoriesGrid stories={stories} />
            <div ref={dummyRef}></div>
          </>
        ) : error ? (
          "Error"
        ) : (
          "Loading"
        )}
      </Layout>
    </SWRConfig>
  );
};

export default Discover;

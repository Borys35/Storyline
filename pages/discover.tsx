import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { ChangeEvent } from "react";
import StoriesGrid from "../components/discover/stories-grid";
import Layout from "../components/layout";
import { SortOptions } from "../interfaces";

const PAGE_SIZE = 8;

interface Props {}

// export const getStaticProps: GetStaticProps = async (
//   context: GetStaticPropsContext
// ) => {
//   const sort = context.params?.sort?.toString();
//   const stories = await getStories(0, PAGE_SIZE, sort);

//   console.log("discover stories", stories);

//   return {
//     props: { fallback: { "/api/stories": [{ stories }] } },
//     revalidate: 60,
//   };
// };

// export const getServerSideProps: GetServerSideProps = async () => {
//   const stories = await getStories(0, PAGE_SIZE);

//   return {
//     props: { fallback: { "/api/stories": { stories } } },
//   };
// };

const Discover: NextPage<Props> = () => {
  const router = useRouter();
  const sort: SortOptions = router.query.sort?.toString() as SortOptions;

  function handleChangeSort(e: ChangeEvent<HTMLSelectElement>) {
    router.push({ query: { sort: e.target.value } });
  }

  return (
    <Layout name="Discover">
      <select
        className="outline-none focus:ring-4 rounded-lg px-4 py-2"
        defaultValue={sort}
        onChange={handleChangeSort}
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="appreciations">Most Appreciated</option>
        <option value="most-popular">Most Popular</option>
        <option value="most-watched">Most Watched</option>
        <option value="highest-watched-view-ratio">Highest w/v ratio</option>
      </select>
      <StoriesGrid pageSize={PAGE_SIZE} pageSort={sort} />
    </Layout>
  );
};

export default Discover;

import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { ChangeEvent } from "react";
import DiscoverGrid from "../components/discover/discover-grid";
import Layout from "../components/layout";
import Select from "../components/select";
import { SortOptions } from "../interfaces";

const PAGE_SIZE = 16;

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
      <h1 className="font-bold text-4xl mb-12">Discover</h1>
      <div>
        <Select
          className="px-4 py-2 ml-auto mb-4"
          defaultValue={sort}
          onChange={handleChangeSort}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="appreciations">Most Appreciated</option>
          <option value="most-popular">Most Popular</option>
          <option value="most-watched">Most Watched</option>
          <option value="highest-watched-view-ratio">Highest w/v ratio</option>
        </Select>
      </div>
      <DiscoverGrid pageSize={PAGE_SIZE} pageSort={sort} />
    </Layout>
  );
};

export default Discover;

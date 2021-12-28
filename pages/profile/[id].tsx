import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Button from "../../components/button";
import Layout from "../../components/layout";
import StoriesGrid from "../../components/stories-grid";
import { StoryFull, User } from "../../interfaces";
import { getStoriesByUserId } from "../../lib/stories";
import { getUser } from "../../lib/users";

interface Props {
  user: User;
  stories: StoryFull[] | null;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id?.toString();

  if (!id)
    return {
      notFound: true,
    };

  const user = await getUser(id);
  if (!user)
    return {
      notFound: true,
    };

  const stories = await getStoriesByUserId(id);

  return {
    props: { user, stories },
  };
};

// export const getStaticProps: GetStaticProps = async (
//   context: GetStaticPropsContext
// ) => {
//   const { params } = context;
//   const id = params?.id?.toString();

//   if (!id)
//     return {
//       notFound: true,
//     };

//   const user = await getUser(id);
//   if (!user)
//     return {
//       notFound: true,
//     };

//   return {
//     props: { user },
//     revalidate: 30,
//   };
// };

// export const getStaticPaths: GetStaticPaths = async (
//   context: GetStaticPathsContext
// ) => {
//   const users = (await getUsers()) || [];

//   const paths = users.map((user) => ({
//     params: { id: user.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

const Profile: NextPage<Props> = ({ user, stories }) => {
  const { id, name, image } = user as any;
  const { data: session } = useSession();

  return (
    <Layout name="Profile">
      <div className="flex gap-6">
        {image && (
          <Image
            src={image?.toString()}
            alt="Avatar"
            width={192}
            height={192}
            className="element"
          />
        )}
        <div className="p-4 flex flex-col items-start gap-4">
          <h1 className="font-bold text-3xl">{name}</h1>

          {session && session.user?.id === id && (
            <Button to="/settings">Go to your settings</Button>
          )}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="font-bold text-2xl mb-2">Stories of {name}</h2>
        {stories ? (
          <StoriesGrid stories={stories || []} />
        ) : (
          <p>No stories yet.</p>
        )}
      </div>
    </Layout>
  );
};

export default Profile;

import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Button from "../../components/button";
import Layout from "../../components/layout";
import { User } from "../../interfaces";
import withAuth from "../../lib/hoc/withAuth";
import { getUser } from "../../lib/users";

interface Props {
  user: User;
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

  return {
    props: { user },
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

const Profile: NextPage<Props> = ({ user }) => {
  const { id, name, picture } = user as any;
  const { data: session } = useSession();

  return (
    <Layout name="Profile">
      <h1 className="font-bold text-3xl">Profile</h1>
      <p>
        Username: <strong>{name}</strong>
      </p>
      {picture && (
        <Image src={picture?.toString()} alt="Avatar" width={64} height={64} />
      )}
      {session && session.user?.id === id && (
        <Button to="/my-profile">Go to your profile</Button>
      )}
    </Layout>
  );
};

export default withAuth(Profile, true);

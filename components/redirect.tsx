import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import Layout from "./layout";

interface Props {
  to: string;
}

const Redirect: FC<Props> = ({ to }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [router, to]);

  return <Layout name="Redirecting...">Redirecting...</Layout>;
};

export default Redirect;

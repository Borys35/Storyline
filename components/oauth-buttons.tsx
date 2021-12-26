import axios from "axios";
import { signIn } from "next-auth/react";
import React, { FC } from "react";
import useSWR from "swr";
import Button from "./button";

interface OAuthButtonsProps {
  frontText?: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const OAuthButtons: FC<OAuthButtonsProps> = ({
  frontText = "Sign in with",
}) => {
  const { data: providers } = useSWR("/api/auth/providers", fetcher);

  return (
    <>
      {providers && (
        <>
          {Object.values(providers)
            .filter(({ type }: any) => type === "oauth")
            .map(({ id, name }: any) => (
              <Button primary key={id} onClick={() => signIn(id)}>
                {frontText} {name}
              </Button>
            ))}
        </>
      )}
    </>
  );
};
export default OAuthButtons;

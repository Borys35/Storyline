import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ComponentType } from "react";

export default function withAuth<T>(
  Component: ComponentType<T>,
  hasToBeLoggedIn: boolean
) {
  const Auth = (props: T) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (hasToBeLoggedIn && status === "unauthenticated") {
      router.push("/sign-up");
      return null;
    }

    if (!hasToBeLoggedIn && status === "authenticated") {
      router.push("/");
      return null;
    }

    return <Component {...props} />;
  };

  return Auth;
}

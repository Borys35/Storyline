import { useSession } from "next-auth/react";
import { ComponentType } from "react";
import Redirect from "../../components/redirect";

export default function withAuth<T>(
  Component: ComponentType<T>,
  hasToBeLoggedIn: boolean
) {
  const Auth = (props: T) => {
    const { status } = useSession();

    if (hasToBeLoggedIn && status === "unauthenticated")
      return <Redirect to="/sign-up" />;

    if (!hasToBeLoggedIn && status === "authenticated")
      return <Redirect to="/" />;

    return <Component {...props} />;
  };

  return Auth;
}

import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import Field from "../components/field";
import Form from "../components/form";
import Layout from "../components/layout";
import OAuthButtons from "../components/oauth-buttons";
import withAuth from "../lib/hoc/withAuth";
import { loginSchema } from "../lib/schemas";

interface FormData {
  email: string;
  password: string;
}

const SignIn: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(loginSchema) });

  async function handleSignIn(data: FormData) {
    setLoading(true);
    const { error, ok } = (await signIn("login", {
      ...data,
      redirect: false,
    })) as any;
    setLoading(false);

    if (!ok) return setError(error);

    setError("");
    router.push("/");
  }

  return (
    <Layout name="Sign in">
      <h1 className="text-4xl font-bold mb-4">Sign in</h1>
      {loading ? "loading" : "not loading"}
      <strong>
        {error === "CredentialsSignin" &&
          "Sign in failed. Check the details you provided are correct."}
      </strong>
      <strong>{error}</strong>
      <OAuthButtons />
      <Form onSubmit={handleSubmit(handleSignIn)}>
        <Field
          label="E-mail"
          inputProps={register("email")}
          error={errors.email}
        />
        <Field
          label="Password"
          inputProps={register("password")}
          tip="Password will be hashed"
          error={errors.password}
        />
        <Button primary>Sign in</Button>
      </Form>
    </Layout>
  );
};

export default withAuth(SignIn, false);

import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import Field from "../components/field";
import Form from "../components/form";
import Layout from "../components/layout";
import Logo from "../components/logo";
import OAuthButtons from "../components/oauth-buttons";
import withAuth from "../lib/hoc/withAuth";
import { registerSchema } from "../lib/schemas";

interface FormData {
  username: string;
  email: string;
  password: string;
  password2: string;
}

const SignUp: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(registerSchema) });

  async function handleSignUp(data: FormData) {
    NProgress.start();
    setLoading(true);
    const { error, ok } = (await signIn("register", {
      ...data,
      redirect: false,
    })) as any;
    setLoading(false);
    NProgress.done();

    if (!ok) return setError(error);

    setError("");
    router.push("/");
  }

  return (
    <Layout
      name="Sign up"
      hasPadding={false}
      hasMaxWidth={false}
      mainOnly={true}
    >
      <div className="flex flex-col-reverse md:flex-row">
        <div className="element flex flex-col gap-10 px-hor py-10 h-full w-full sm:w-96 rounded-l-none rounded-r-3xl bg-cyan-500">
          <Logo />
          {error === "CredentialsSignin" && (
            <strong>
              Sign up failed. Try different credentials. E-mail might have been
              used.
            </strong>
          )}
          <Form onSubmit={(e) => e.preventDefault()} basicStyling={false}>
            <OAuthButtons />
          </Form>
          <Form onSubmit={handleSubmit(handleSignUp)} basicStyling={false}>
            <Field
              label="Username"
              inputProps={register("username")}
              error={errors.username}
            />
            <Field
              label="E-mail"
              inputProps={register("email")}
              error={errors.email}
              type="email"
            />
            <Field
              label="Password"
              inputProps={register("password")}
              tip="Password will be hashed"
              error={errors.password}
              type="password"
            />
            <Field
              label="Repeat Password"
              inputProps={register("password2")}
              tip="To ensure you didn't mispelled the password"
              error={errors.password2}
              type="password"
            />
            <Button disabled={loading} primary>
              Sign up
            </Button>
          </Form>
          <p>
            You have already created account?{" "}
            <Link href="/sign-in">
              <a className="link">Sign in</a>
            </Link>
          </p>
        </div>
        <div className="flex-1 p-10">
          <h1 className="text-4xl font-bold mb-4">Sign up</h1>
          <p>
            With account you can create your own stories and share your thoughts
            about works of other creators
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(SignUp, false);

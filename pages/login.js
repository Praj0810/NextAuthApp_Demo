import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import { useFormik } from "formik";
import loginValidation from "../lib/validate";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidation,
    onSubmit,
  });

  async function onSubmit(values) {
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });
    console.log(status);
    if (status.ok) router.push(status.url);
  }

  //Handler Function for Google
  async function handleGoogleSignIn() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }
  async function handleGitHubSignIn() {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  }

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-5">
        <div className="title">
          <h1 className="text-gray-800 text-2xl font-bold py-1">Explore</h1>
          <p className="w-3/4 mx-auto text-grey-400 ">
            {" "}
            Hello world I m Programmer
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div
            className={`${styles.input_group} ${
              formik.errors.email && formik.touched.email
                ? "border-rose-500"
                : ""
            }`}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
              {...formik.getFieldProps("email")}
            />
          </div>
          {/* {formik.errors.email && formik.touched.email?<span className='text-rose-500'> {formik.errors.email}</span>: <></>} */}
          <div
            className={`${styles.input_group} ${
              formik.errors.password && formik.touched.password
                ? "border-rose-500"
                : ""
            }`}
          >
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
          </div>
          {/* {formik.errors.password && formik.touched.password?<span className='text-rose-500'> {formik.errors.password}</span>: <></>} */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div className="input-button">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className={styles.button_custom}
            >
              Sign in with Google
              <Image src={"/assets/google.svg"} width="20" height="20"></Image>
            </button>
          </div>
          <div className="input-button">
            <button
              type="button"
              onClick={handleGitHubSignIn}
              className={styles.button_custom}
            >
              Sign in with GitHub
              <Image src={"/assets/github.svg"} width="25" height="25"></Image>
            </button>
          </div>
        </form>
        <p className="text-centre text-gray-400">
          {" "}
          Don't have an account yet?{" "}
          <Link href={"/register"} className="text-blue-700">
            Sign Up
          </Link>
        </p>
      </section>
    </Layout>
  );
}

import Head from "next/head";
import Layout from "../layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import { useFormik } from "formik";
import { registerValidation } from "../lib/validate";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: registerValidation,
    onSubmit,
  });
  async function onSubmit(values) {
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    await fetch("http://localhost:3000/api/auth/signup", option)
      .then((res) => res.json())
      .then((data) => {
        if (data) router.push("http://localhost:3000");
      });
  }

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-2xl font-bold py-0">
            Register here
          </h1>
        </div>

        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div
            className={`${styles.input_group} ${
              formik.errors.username && formik.touched.username
                ? "border-rose-500"
                : ""
            }`}
          >
            <input
              type="text"
              name="Username"
              placeholder="Username"
              className={styles.input_text}
              {...formik.getFieldProps("username")}
            />
          </div>
          {/* {formik.errors.username && formik.touched.username?<span className='text-rose-500'> {formik.errors.username}</span>: <></>} */}
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
          <div
            className={`${styles.input_group} ${
              formik.errors.confirmPassword && formik.touched.confirmPassword
                ? "border-rose-500"
                : ""
            }`}
          >
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className={styles.input_text}
              {...formik.getFieldProps("confirmPassword")}
            />
          </div>
          {/* {formik.errors.confirmPassword && formik.touched.confirmPassword?<span className='text-rose-500'> {formik.errors.confirmPassword}</span>: <></>} */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-centre text-gray-400">
          Have an account!{" "}
          <Link href={"/login"} className="text-blue-700">
            Sign In
          </Link>
        </p>
      </section>
    </Layout>
  );
}

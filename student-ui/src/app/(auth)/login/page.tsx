"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useLoginMutation, useRegisterMutation } from "@/redux/features/auth/authApi";
import { Bounce, toast } from "react-toastify";
import { useTheme } from "next-themes";
import { ImSpinner2 } from "react-icons/im";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Page = (props: Props) => {
  const  theme  = "dark";
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [login, { data, isSuccess, error, isLoading }] =
    useLoginMutation();

    const { refetch } = useLoadUserQuery({}, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Sign in successful";
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
        transition: Bounce,
      });

      refetch();
      router.push(redirectUrl);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        console.log(errorData.data.message);
        toast.error(errorData.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
          theme: theme,
        });
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      const data = {
        email,
        password,
        role:"user"
      };
      await login(data);
    },
  });

  const { errors, touched, handleChange, handleSubmit } = formik;

  const handleGoogleSignin = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const redirectTo = searchParams.get("redirectTo") || "/";
  
    document.cookie = `redirectTo=${redirectTo}; path=/; domain=.d4deepak.com; samesite=none; secure`;
  
    const authWindow = window.open("https://eduai-server.d4deepak.com/auth/google",
     "_blank", "width=500,height=600");
  
    window.addEventListener("message", (event) => {
      if (event.data?.success) {
        authWindow?.close();
        window.location.href = event.data.redirectUrl;
      }
    }, { once: true });
  };
  
  return (
    <div className="min-h-screen max-w-screen-xl mx-auto flex justify-center items-center">
      <div className="max-w-[420px] bg-[#131920] rounded-xl p-10 w-full ">
        <h1>Sign in to Edu Ai</h1>
        <p className="label">Welcome back! Please sign in to continue</p>
        <Button
          onClick={handleGoogleSignin}
          className="w-full my-5 bg-[#181F28] text-slate-300 hover:bg-background transition-colors duration-300 "
        >
          <FaGoogle size={20} className="me-2" />
          Sign in with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm ">
            <span className="bg-[#131920] px-2 text-muted-foreground">or</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <Label
              htmlFor="email"
              className="ms-1 font-normal dark:text-slate-400"
            >
              Email
            </Label>
            <Input
              type="email"
              onChange={handleChange}
              id="email"
              className={`${
                errors.email && touched.email && "border-red-500"
              } my-1 bg-transparent focus-visible:ring-slate-500`}
            />
            {errors.email && touched.email && (
              <span className="text-red-500 text-sm block">{errors.email}</span>
            )}
          </div>

          <div className="my-3">
            <Label
              htmlFor="password"
              className="ms-1 font-normal dark:text-slate-400"
            >
              Password
            </Label>
            <Input
              type="password"
              onChange={handleChange}
              id="password"
              className={`${
                errors.password && touched.password && "border-red-500"
              } my-1 bg-transparent focus-visible:ring-slate-500`}
            />
            {errors.password && touched.password && (
              <span className="text-red-500 text-sm block">
                {errors.password}
              </span>
            )}
          </div>
          <div className="w-full flex justify-end mb-5">
            <Link
              href="/forgot-password"
              className="text-slate-600 hover:text-slate-400 "
            >
              Forgot password?
            </Link>
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className="w-full text-white font-semibold text-base bg-blue-600 hover:bg-blue-700 transition-colors duration-300 ease-in-out mt-2"
          >
            {isLoading && (
              <ImSpinner2 className="mr-2 h-4 w-4 animate-spin text-primary-foreground" />
            )}
            {isLoading ? "Loading..." : "Sign in"}
          </Button>

          <div className="mt-5 w-full flex justify-center">
            <span className="text-slate-500 w-full text-center">
              Don’t have an Account?{" "}
              <Link href="/signup" className="text-blue-500">
                Sign up
              </Link>{" "}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;

"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { redirect } from "next/navigation";
import { Bounce, toast } from "react-toastify";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import { ImSpinner2 } from "react-icons/im";

type Props = {};

const schema = Yup.object().shape({
  activationCode: Yup.string()
    .required("Please enter the full code")
    .min(4, "Code must be 4 digits")
    .max(4, "Code must be 4 digits"),
});

const Page = (props: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const { theme } = useTheme();

  // if (Object.keys(user).length === 0) {
  //   if(!user.password){
  //     redirect("/signup");
  //   }
  // }

  const [activation, { data, isSuccess, error, isLoading }] =
    useActivationMutation();

  const [otpValue, setOtpValue] = useState<string>("");

  const formik = useFormik({
    initialValues: { activationCode: "" },
    validationSchema: schema,
    onSubmit: async ({ activationCode }) => {
      console.log("Submitted OTP:", activationCode);
      await activation({
        name: user.name,
        email: user.email,
        password: user.password,
        activation_code: activationCode,
      });
    },
  });

  const handleOtpChange = (value: string) => {
    setOtpValue(value);
    formik.setFieldValue("activationCode", value);
  };

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
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
      redirect("/");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
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

  const { errors, touched, handleSubmit } = formik;

  return (
    <div className="min-h-screen max-w-screen-xl mx-auto flex justify-center items-center">
      <div className="max-w-[420px] bg-[#131920] rounded-xl p-10 w-full ">
        <div className="w-full flex flex-col justify-center items-center space-y-2">
          <h1>Verify your email</h1>
          <p className="label text-center">
            Enter the verification code sent to your Email ID{" "}
            <strong>{user?.email}</strong>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="w-full items-center flex flex-col justify-center space-y-5">
            <InputOTP
              maxLength={4}
              value={otpValue}
              onChange={handleOtpChange}
              name="activationCode"
              id="activationCode"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
            {errors.activationCode && touched.activationCode && (
              <span className="text-red-500 text-sm block">
                {errors.activationCode}
              </span>
            )}
            <span className="text-slate-400">Don’t receive a code? (21s)</span>
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full font-semibold text-base bg-yellow-600 hover:bg-yellow-700 transition-colors duration-300 ease-in-out mt-2"
          >
            {isLoading && (
              <ImSpinner2 className="mr-2 h-4 w-4 animate-spin text-primary-foreground" />
            )}
            {isLoading ? "Verifying..." : "Verify"}
            
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;

"use client";
import SignUpForm from "@/components/forms/SignUpForm";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import TextField from "@/components/forms/TextField";
import Link from "next/link";
import ClipLoader from "react-spinners/ClipLoader";
import { useForm, Resolver } from "react-hook-form";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface User {
  name: string;
  username: string;
  email: string;
  password: string;
}

const schema = yup.object({
  name: yup.string().required(),
  username: yup
    .string()
    .required("You must enter a username")
    .matches(
      /^[A-Za-z0-9_]{3,30}$/,
      "Username must be between 3 and 30 characters long and may only contain letters, numbers, and underscores."
    ),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,50})/,
      "Must Contain minimum 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

const SignUp: FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: yupResolver(schema) });

  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passValue, setpassValue] = useState<string>("");

  const onSubmit = async (data: User) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);

      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-[100vw] h-[100vh] ">
      <div className="flex flex-col text-center">
        <h2 className="title-text text-black font-bold">Welcome back!</h2>
        <span className="body-text text-black">
          Sign in to get the most out of nuntium.
        </span>
      </div>
      {/* <SignUpForm /> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-80"
      >
        <div>
          <input
            className={`flex bg-[#F8F8F8] rounded-lg p-3 w-full min-w-[auto] outline-none font-normal text-base text-[#1C1C1C80] text-center transition-all duration-300 focus:shadow-sm focus:border ${
              errors?.email && "border border-[#d90504]"
            }`}
            type="email"
            placeholder={"Email"}
            title="Enter your email address"
            {...register("email")}
          />
          {errors?.email && (
            <span className="text-[#d90504] text-xs">
              {errors.email.message}
            </span>
          )}
        </div>
        <div>
          <input
            className={`flex bg-[#F8F8F8] rounded-lg p-3 w-full min-w-[auto] outline-none font-normal text-base text-[#1C1C1C80] text-center transition-all duration-300 focus:shadow-sm focus:border ${
              errors?.name && "border border-[#d90504]"
            }`}
            type="text"
            placeholder={"Full Name"}
            title="Enter your Name"
            {...register("name")}
          />
          {errors?.name && (
            <span className="text-[#d90504] text-xs">
              {errors.name.message}
            </span>
          )}
        </div>
        <div>
          <input
            className={`flex bg-[#F8F8F8] rounded-lg p-3 w-full min-w-[auto] outline-none font-normal text-base text-[#1C1C1C80] text-center transition-all duration-300 focus:shadow-sm focus:border ${
              errors?.username && "border border-[#d90504]"
            }`}
            type="username"
            placeholder={"Username"}
            title="Enter your username"
            {...register("username")}
          />
          {errors?.username && (
            <span className="text-[#d90504] text-xs">
              {errors.username.message}
            </span>
          )}
        </div>
        <div>
          <div
            className={`flex justify-between bg-[#F8F8F8] rounded-lg p-3 w-full min-w-[auto] outline-none font-normal text-base text-[#1C1C1C80] text-center transition-all duration-300 focus:shadow-sm focus:border ${
              errors?.password && "border border-[#d90504]"
            }`}
          >
            {" "}
            <input
              id="password"
              className={`bg-[#F8F8F8] rounded-lg w-full min-w-[auto] outline-none font-normal text-base text-[#1C1C1C80] text-center`}
              type={showPassword ? "text" : "password"}
              placeholder={"Password"}
              title="Enter your password"
              {...register("password")}
              onChange={(e) => setpassValue(e.target.value)}
            />
            {passValue && (
              <button onClick={() => togglePassword()} type="button">
                <Image
                  src={
                    showPassword
                      ? "/images/show-pass.svg"
                      : "/images/hide-pass.svg"
                  }
                  alt="show"
                  width={24}
                  height={24}
                />
              </button>
            )}
          </div>
          {errors?.password && (
            <span className="text-[#d90504] text-xs">
              {errors.password.message}
            </span>
          )}
        </div>
        {loading ? (
          <div className="w-full flex justify-center">
            <ClipLoader
              color={"#1C1C1C"}
              loading={loading}
              size={40}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <Button name="Sign Up" color="red" isSubmitBtn />
        )}
        <div className="flex justify-center">
          <span className="text-xs">
            Have an account?
            <Link href="/login" className="font-bold">
              {" "}
              Log in
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

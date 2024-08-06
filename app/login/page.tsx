"use client";
import Button from "@/components/Button";
import LoginForm from "@/components/forms/LoginForm";
import TextField from "@/components/forms/TextField";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import { useForm, Resolver } from "react-hook-form";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface User {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login: FC = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passValue, setpassValue] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: User) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      // toast.error(error.message);
      if (error.response.status === 400) {
        toast.error("User does not exist");
      } else if (error.response.status === 403) {
        toast.error(error.response.data.message);
      } else toast.error(error.message);
      console.log(error);
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
      {/* <LoginForm /> */}
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
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <input type="checkbox" id="remember-me" name="checkbox" value="1" />
            <label htmlFor="remember-me" className="text-xs">
              Remember me
            </label>
          </div>
          <Link href="/resetpassword" className="text-xs">
            Forgot Password?
          </Link>
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
          <Button
            name="Login"
            color="red"
            // handleClick={onLogin}
            isSubmitBtn
          />
        )}

        <div className="flex justify-center">
          <span className="text-xs">
            Don't have an account?
            <Link href="/signup" className="font-bold">
              {" "}
              Sign up
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;

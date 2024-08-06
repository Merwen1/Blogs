"use client";
import React, { useState } from "react";
import TextField from "./TextField";
import Button from "../Button";
import Link from "next/link";

interface FormData {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-4 w-80">
      <TextField
        value={formData?.username}
        name="username"
        placeholder="Username"
        handleChange={handleChange}
        pattern=""
        type="text"
        maxLength={100}
        isRequired={true}
      />
      <TextField
        value={formData?.password}
        name="password"
        placeholder="Password"
        handleChange={handleChange}
        pattern=""
        type="password"
        maxLength={100}
        isRequired={true}
      />
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            id="demoCheckbox"
            name="checkbox"
            value="1"
          ></input>
          <label htmlFor="demoCheckbox" className="text-xs">
            Remember me
          </label>
        </div>
        <Link href="/resetpassword" className="text-xs">
          Forgot Password?
        </Link>
      </div>
      <Button name="Login" color="red" />
      <div className="flex justify-center">
        <span className="text-xs">
          Don't have an account?
          <Link href="/signup" className="font-bold">
            {" "}
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;

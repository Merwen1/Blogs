"use client";
import React, { useEffect, useState } from "react";
import TextField from "./TextField";
import Button from "../Button";
import Link from "next/link";

interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
const SignUpForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
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
        value={formData?.email}
        name="email"
        placeholder="Email"
        handleChange={handleChange}
        pattern=""
        type="email"
        maxLength={100}
        isRequired={true}
      />
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
      <TextField
        value={formData?.confirmPassword}
        name="confirmPassword"
        placeholder="Confirm Password"
        handleChange={handleChange}
        pattern=""
        type="password"
        maxLength={100}
        isRequired={true}
      />
      <Button name="Sign Up" color="red" />
      <div className="flex justify-center">
        <span className="text-xs">
          Have an account?
          <Link href="/login" className="font-bold">
            {" "}
            Log in
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;

"use client";
import { useRouter } from "next/navigation";
import React, { ButtonHTMLAttributes } from "react";

const Button = ({
  name,
  color,
  handleClick,
  isDisabled,
  isSubmitBtn,
}: {
  name: string;
  color: string;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  isSubmitBtn?: boolean;
}) => {
  const router = useRouter();
  return (
    <button
      className={`px-[22px] py-3 text-base font-semibold duration-300 ease-in-out uppercase border-solid border-[#1C1C1C] border-2 rounded-[10px] hover:bg-[#D90504] hover:text-white hover:tracking-widest`}
      disabled={isDisabled || false}
      onClick={handleClick}
      type={isSubmitBtn ? "submit" : "button"}
    >
      {name}
    </button>
  );
};

export default Button;

import Image from "next/image";
import React from "react";
import Button from "./Button";

const Header = () => {
  return (
    <header className="widget-container relative w-full h-[592px]">
      <Image
        src={"/images/banner-cover.jpg"}
        alt="header"
        width={1316}
        height={592}
        className="object-cover w-full h-full"
      />
      <span className="absolute font-bold top-1/2 start-11 text-white text-6xl shadow-2xl">
        you will be unstoppable
      </span>
    </header>
  );
};

export default Header;

import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="widget-container w-full" id="footer">
      <div className="flex flex-col items-center justify-center bg-[#1C1C1C] p-[10%] gap-7">
        <span className="title-text text-white">want to connect?</span>
        <span className="body-text text-white">
          You may reach out to us via the following social media channels:
        </span>
        <div className="flex items-center justify-center gap-4">
          <Image
            src={"/images/linkedIn.svg"}
            alt="linkedIn"
            width={30}
            height={30}
            className="cursor-pointer test-image duration-300 ease-in-out"
          />
          <Image
            src={"/images/instagram.svg"}
            alt="instagram"
            width={30}
            height={30}
            className="cursor-pointer test-image duration-300 ease-in-out"
          />
          <Image
            src={"/images/twitter.svg"}
            alt="twitter"
            width={30}
            height={30}
            className="cursor-pointer test-image duration-300 ease-in-out"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

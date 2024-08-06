import Image from "next/image";
import React from "react";

const Stories = () => {
  return (
    <div className="widget-container relative w-full min-h-[2000px] my-10">
      <div className="bg-[#1C1C1C]">
        {/* First Section  */}
        <div className="relative flex justify-between px-[10%] pt-[12%] z-10">
          <div className="pt-[26px] text-start w-2/5">
            <span className="head-text text-white">
              We tell stories that drives the heart.
            </span>
            <p className="body-text text-white">
              Laboris consectetur sunt nulla eiusmod voluptate eiusmod dolor
              nisi qui dolor cillum fugiat ad. Id sit mollit labore sunt sit
              culpa qui minim pariatur et officia elit id. Tempor cupidatat
              veniam esse ad veniam dolore excepteur tempor dolor consectetur ut
              id.
            </p>
          </div>
          <div className="relative h-[419px] w-2/5">
            <Image
              src={"/images/banner-cover.jpg"}
              alt="about-us"
              width={569}
              height={419}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-[75%] end-1/2 h-[419px] w-full">
              <Image
                src={"/images/banner-cover.jpg"}
                alt="about-us"
                width={569}
                height={419}
                className="h-full w-full object-cover"
              />
              <span className="head-text text-white ps-4">
                We tell the news that makes the most impact.
              </span>
              <p className="body-text text-white ps-4">
                Laboris consectetur sunt nulla eiusmod voluptate eiusmod dolor
                nisi qui dolor cillum fugiat ad. Id sit mollit labore sunt sit
                culpa qui minim pariatur et officia elit id. Tempor cupidatat
                veniam esse ad veniam dolore excepteur tempor dolor consectetur
                ut id.
              </p>
            </div>
          </div>
        </div>
        {/* Second Section  */}
        <div className="relative flex flex-col items-start w-full z-10 mt-[850px] ps-[25%]">
          <span className="head-text text-white w-3/4">
            We share the little moments that shows we’re alive.
          </span>
          <p className="body-text text-white w-3/4">
            Laboris consectetur sunt nulla eiusmod voluptate eiusmod dolor nisi
            qui dolor cillum fugiat ad. Id sit mollit labore sunt sit culpa qui
            minim pariatur et officia elit id. Tempor cupidatat veniam esse ad
            veniam dolore excepteur tempor dolor consectetur ut id.
          </p>
          <div className="flex w-full gap-5 overflow-x-hidden my-16">
            <Image
              src={"/images/banner-cover.jpg"}
              alt="about-us"
              width={350}
              height={350}
              className="h-full w-full object-cover"
            />
            <Image
              src={"/images/banner-cover.jpg"}
              alt="about-us"
              width={350}
              height={350}
              className="h-full w-full object-cover"
            />
            <Image
              src={"/images/banner-cover.jpg"}
              alt="about-us"
              width={350}
              height={350}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="absolute end-[20%] top-0 w-2 h-[1000px] bg-white"></div>
        <div className="absolute start-[20%] bottom-0 w-2 h-[1300px] bg-white"></div>
      </div>
    </div>
  );
};

export default Stories;

import Image from "next/image";
import React from "react";

interface Props {
  img?: string;
  title?: string;
  body: string;
}

const Desc = (props: Props) => {
  return (
    <div className="flex flex-col items-center my-48">
      {props.img && (
        <div className="h-[78px] mb-[26px]">
          <Image
            src={props.img}
            alt="logo"
            width={275}
            height={78}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      {props.title && (
        <span className="head-text text-black mb-[35px]">{props.title}</span>
      )}
      <p className="tag-text text-black">{props.body}</p>
    </div>
  );
};

export default Desc;

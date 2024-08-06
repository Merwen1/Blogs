import Image from "next/image";
import React from "react";

interface Props {
  img: string;
  name: string;
  username: string;
  desc: string;
}
function ProfileCard(props: Props) {
  return (
    <div className="flex w-full max-w-[718px] justify-center gap-[75px] py-28">
      <div className="flex justify-center items-center w-[200px] h-[200px] rounded-full overflow-hidden">
        <Image
          src={props.img}
          alt="profile-picture"
          width={200}
          height={200}
          className="w-full h-full object-cover object-center"
          draggable={false}
        />
      </div>
      <div className="flex flex-col w-3/5 gap-2 items-start text-start">
        <div className="flex flex-col items-start">
          <span className="head-text text-black font-bold">{props.name}</span>
          <span className="body-text text-[#1C1C1C80] uppercase">
            @{props.username}
          </span>
        </div>
        <p className="body-text text-[#1C1C1C]">{props.desc}</p>
      </div>
    </div>
  );
}

export default ProfileCard;

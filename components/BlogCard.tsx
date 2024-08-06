import Image from "next/image";
import React from "react";
import { date } from "zod";

interface PropsType {
  title: string;
  subTitle: string;
  desc: string;
  img?: string;
  created_at?: Date;
  user_id?: string;
}

const BlogCard = ({ post }: { post: PropsType }) => {
  return (
    <div className="flex justify-between w-full h-[311px] my-[50px] cursor-pointer group">
      <div className="w-2/5 h-full overflow-hidden">
        <Image
          src={post?.img || "/images/banner-cover.jpg"}
          alt="header"
          width={371}
          height={298}
          className="object-cover w-full h-full group-hover:scale-110 duration-300 ease-in-out"
        />
      </div>
      <div className="flex flex-col text-start w-1/2">
        <span className="tag-text text-[#1C1C1C]">{post?.subTitle}</span>
        <span className="title-text text-black font-bold">{post?.title}</span>
        <span className="body-text text-[#1C1C1C]">
          {post?.created_at ? new Date(post.created_at).toLocaleString() : ""}
        </span>
        <p className="body-text text-black line-clamp-[8]">{post?.desc}</p>
      </div>
    </div>
  );
};

export default BlogCard;

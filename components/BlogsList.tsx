"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import Link from "next/link";

interface Post {
  title: string;
  subTitle: string;
  desc: string;
  img?: string;
  created_at?: Date;
  user_id?: string;
}

const BlogsList = ({
  posts,
  noPagination = false,
  title,
}: {
  posts: Post[];
  noPagination?: boolean;
  title: string;
}) => {
  // let postsChunks: Post[][] = [];
  const [active, setActive] = useState<number>(0);
  const [postsChunks, setPostsChunks] = useState<Post[][]>([]);

  useEffect(() => {
    const size = 5;
    let tempPosts = posts;
    while (tempPosts.length > 0) {
      const chunkArr = tempPosts.splice(0, size);
      setPostsChunks((prev: Post[][]) => [...prev, chunkArr]);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col items-center max-w-[856px] mt-[50px]">
        <span
          className="head-text text-black font-bold underline"
          id={`latestblogs${active}`}
        >
          {title}
        </span>
        {posts && postsChunks && postsChunks[active]?.length > 0 ? (
          postsChunks[active].map((item, index) => (
            <BlogCard post={item} key={index} />
          ))
        ) : (
          <span className="text-2xl text-black my-8">No posts yet ☹</span>
        )}
      </div>
      {noPagination ? (
        <Link
          href={"/blogs"}
          className="tag-text text-[#1C1C1C] font-bold my-9"
        >
          Show More
        </Link>
      ) : (
        <>
          {" "}
          {postsChunks.length > 1 && (
            <div className="pagination-container flex justify-center w-full gap-2 mb-8">
              {postsChunks.map((item, index) => (
                <a
                  href={`#latestblogs${active}`}
                  key={index}
                  onClick={() => setActive(index)}
                  className={`text-black float-left px-4 py-2 border-[1px] border-solid border-[#1C1C1C66] hover:bg-[#1C1C1C66] transition-all duration-300  ${
                    active == index ? "bg-[#1C1C1C66] text-white" : ""
                  }`}
                >
                  {index + 1}
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default BlogsList;

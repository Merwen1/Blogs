import BlogsList from "@/components/BlogsList";
import { Post } from "@/types/types";
import React from "react";

async function getAllPosts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/get_posts`,
      { next: { revalidate: 0 }, cache: "no-store" }
    );
    const data = await res.json();
    const posts: Post[] = data.data;
    return posts;
  } catch (error) {
    console.log("Error Fetching data ", error);
  }
}

export default async function Blogs() {
  const posts = await getAllPosts();

  return <div>{posts && <BlogsList posts={posts} title="All Blog's" />}</div>;
}

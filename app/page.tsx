import BlogsList from "@/components/BlogsList";
import Header from "@/components/Header";
import { GetStaticProps } from "next";
import Image from "next/image";
import { any } from "zod";

interface Post {
  title: string;
  subTitle: string;
  desc: string;
  img?: string;
  created_at?: Date;
  user_id?: string;
}

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

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <>
      <Header />
      {posts && <BlogsList posts={posts} title="Latest Blog's" noPagination />}
    </>
  );
}

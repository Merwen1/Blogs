"use client";
import BlogsList from "@/components/BlogsList";
import ProfileCard from "@/components/ProfileCard";
import React from "react";
import { GET } from "../api/users/me/route";
import Loading from "../loading";

type User = {
  email: string;
  isAdmin: boolean;
  isVerfied: boolean;
  name: string;
  username: string;
  __v: number;
  _id: string;
  img: string;
  desc: string;
};

interface Post {
  title: string;
  subTitle: string;
  desc: string;
  img?: string;
  created_at?: Date;
  user_id?: string;
}

export const getUserDetails = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/me`,
      {
        cache: "no-store",
        method: "GET",
      }
    );
    const data2 = await res.json();
    const userData: User = data2.data;
    return userData;
  } catch (error) {
    console.log("Error Fetching data ", error);
  }
};

const getUserPosts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/get_my_posts`,
    {
      cache: "no-store",
      method: "GET",
    }
  );
  const data = await res.json();
  const posts: Post[] = data.data;

  if (!res) {
    throw new Error(" Failed to fetch data");
  }
  return posts;
};

const Profile = async () => {
  const data = await getUserDetails();
  const posts = await getUserPosts();

  return (
    <>
      {data && posts ? (
        <div>
          <ProfileCard
            img="/images/test.jpeg"
            name={data.name}
            username={data.username}
            desc="Ipsum adipisicing culpa est nisi consequat ex amet magna culpa veniam tempor irure ea. Reprehenderit labore do tempor eiusmod in consectetur ex sunt id mollit commodo ipsum deserunt quis."
          />
          <BlogsList posts={posts} title="My Blog's" />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Profile;

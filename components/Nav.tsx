"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { boolean } from "yup";
import AddPostModal from "./AddPostModal";

interface LinkItem {
  name: string;
  link: string;
}

const Nav = ({ isLoggedIn = false }: { isLoggedIn: boolean }) => {
  const router = useRouter();
  const [profileBtn, setProfileBtn] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setLoggedIn(isLoggedIn);
    }, 500);
  }, [isLoggedIn]);

  useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  const links: LinkItem[] = [
    {
      name: "Profile",
      link: "/profile",
    },
    {
      name: "Settings",
      link: "/settings",
    },
    {
      name: "Logout",
      link: "/api/users/logout",
    },
  ];
  return (
    <nav className="w-full bg-white flex justify-center min-h-20 py-[14px]">
      <div className="widget-container flex w-full justify-between items-center ">
        <div className="flex items-center">
          <div className="flex justify-between gap-8">
            <Link className="text-base p-2 cursor-pointer" href={"/"}>
              LOGO
            </Link>

            <Link
              className="text-base p-2 cursor-pointer hover:text-[#D90504]"
              href={"/"}
            >
              Home
            </Link>

            <Link
              className="text-base p-2 cursor-pointer hover:text-[#D90504]"
              href={"/about"}
            >
              About Us
            </Link>

            <Link
              className="text-base p-2 cursor-pointer hover:text-[#D90504]"
              href={"/blogs"}
            >
              Blogs
            </Link>

            <button
              onClick={() => {
                setShowModal(true);
              }}
            >
              Add Post
            </button>
          </div>
        </div>
        {loggedIn ? (
          <div className="flex gap-[35px]">
            <button>
              <Image
                src={"/images/bell.svg"}
                alt="search"
                width={30}
                height={30}
              />
            </button>
            <button
              className="relative flex justify-center items-center w-[60px] h-[60px] rounded-full"
              onClick={() => setProfileBtn(!profileBtn)}
            >
              <Image
                src={"/images/test.jpeg"}
                alt="search"
                width={30}
                height={30}
                className="w-full h-full object-cover object-center rounded-full"
              />
              <div
                className={`absolute bg-[#FAFAFA] top-[75px] end-0 z-10 p-5 w-[300px] flex flex-col gap-3 rounded-md transition-all ease-in-out duration-300 ${
                  profileBtn ? "visible" : "invisible"
                } ${profileBtn ? "h-fit" : "h-0"} ${
                  profileBtn ? "scale-100" : "scale-0"
                }`}
              >
                {links.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    className="body-text text-black w-full p-1 border-b last:border-none last:text-[#D90504]"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-5 cursor-pointer">
            <Image
              src={"/images/search.svg"}
              alt="search"
              width={30}
              height={30}
            />
            <Button
              name="Login"
              color="red"
              handleClick={() => router.push("/login")}
            />
          </div>
        )}
      </div>
      <AddPostModal showModal={showModal} setShowModal={setShowModal} />
    </nav>
  );
};

export default Nav;

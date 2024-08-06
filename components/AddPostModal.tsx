"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { useEdgeStore } from "../helpers/edgestore";

type Props = {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
};

interface Post {
  title: string;
  subTitle: string;
  desc: string;
  img?: string;
  created_at?: Date;
  user_id?: string;
}

const schema = yup.object({
  title: yup.string().required("You must enter a title"),
  subTitle: yup.string().required(),
  desc: yup.string().required("You must enter a description"),
});

const AddPostModal = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userID, setUserID] = useState<string>("");
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [fileLink, setFileLink] = useState<string>("");
  const { edgestore } = useEdgeStore();
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Post>({ resolver: yupResolver(schema) });

  const getTokenData = async () => {
    try {
      const response = await axios.get("/api/users/me");
      return response.data.data;
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (props.showModal) {
      getTokenData().then((res) => {
        setUserID(res._id);
      });
    }
  }, [props.showModal]);

  const onSubmit = async (data: Post) => {
    const date = new Date();
    try {
      setLoading(true);
      data.img = fileLink;
      data.created_at = date;
      data.user_id = userID;

      const response = await axios.post("/api/posts/add_post", data);
      if (file) {
        await edgestore.publicFiles.confirmUpload({
          url: fileLink,
        });
      }

      router.push("/");
      toast.success(response.data.message);
    } catch (error: any) {
      console.log("Post upload failed", error.message);

      toast.error(error.response?.data.error);
    } finally {
      setLoading(false);
      props.setShowModal(false);
      reset();
    }
  };

  return (
    <>
      {props.showModal && (
        <div className="absolute top-0 left-0 right-0 flex justify-center w-full h-full bg-[#00000033] z-50">
          <div className="w-auto my-6 mx-auto max-w-3xl z-50">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-3xl font=semibold">Add Post</h3>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => props.setShowModal(false)}
                >
                  <Image
                    src={"/images/close_x.svg"}
                    width={25}
                    height={25}
                    alt="close"
                  />
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <form
                  className="flex flex-col gap-4 w-80"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    className={`flex bg-[#F8F8F8] rounded-lg p-3 w-full min-w-[auto] outline-none font-normal text-base text-[#1C1C1C80] text-center transition-all duration-300 focus:shadow-sm focus:border`}
                    type="text"
                    placeholder={"Title"}
                    title="Enter title"
                    {...register("title")}
                  />
                  <input
                    className={`flex bg-[#F8F8F8] rounded-lg p-3 w-full min-w-[auto] outline-none font-normal text-base text-[#1C1C1C80] text-center transition-all duration-300 focus:shadow-sm focus:border`}
                    type="text"
                    placeholder={"Sub-Title"}
                    title="Enter sub-title"
                    {...register("subTitle")}
                  />
                  <textarea
                    className={`flex bg-[#F8F8F8] rounded-lg p-3 w-full min-w-[auto] outline-none font-normal text-base text-[#1C1C1C80] text-center transition-all resize-none h-40 duration-300 focus:shadow-sm focus:border`}
                    placeholder={"Description"}
                    title="Enter description"
                    {...register("desc")}
                  />
                  <div className="relative">
                    <input
                      type="file"
                      className="flex bg-[#F8F8F8] rounded-lg p-3 w-full min-w-[auto] outline-none font-normal text-base text-[#1C1C1C80] text-center transition-all duration-300 focus:shadow-sm focus:border"
                      onChange={async (e) => {
                        const selectedFile = e.target.files?.[0];
                        if (selectedFile) {
                          setFile(selectedFile);

                          const res = await edgestore.publicFiles.upload({
                            file: selectedFile,
                            onProgressChange: (progress) => {
                              // you can use this to show a progress bar
                              setUploadProgress(progress);
                            },
                            options: {
                              // replaceTargetUrl: oldFileUrl,
                              temporary: true,
                            },
                          });
                          // you can run some server action or api here
                          // to add the necessary data to your database
                          setFileLink(res?.url);
                        }
                      }}
                    />
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div
                        className={`absolute h-1 bg-[#1C1C1C] bottom-0 start-0 transition duration-300 rounded-lg`}
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    )}
                  </div>
                  <div className="flex items-center justify-end py-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => props.setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <Button name="Submit" color="red" isSubmitBtn />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPostModal;
